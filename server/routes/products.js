const router = require("express").Router();
const admin = require("firebase-admin");
const db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true });
const stripe = require("stripe")(process.env.STRIPE_KEY);
// const express = require("express");
router.post("/create-checkout-session", async (req, res, next) => {
  try {
    const customer = await stripe.customers.create({
      metadata: {
        user_id: req.body.data.user.uid.toString(),
        userName: req.body.data.user.displayName,
        total: req.body.data.total,
      },
    });
    const line_items = req.body.data.cart.map((item) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.title,
            images: [item.imgURL],
            metadata: {
              id: item.id,
              category: item.category,
            },
          },
          unit_amount: Number(item.price * 100).toFixed(),
        },
        quantity: item.qty,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      shipping_address_collection: { allowed_countries: ["US", "CA"] },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 0, currency: "usd" },
            display_name: "Free shipping",
            delivery_estimate: {
              minimum: { unit: "hour", value: 2 },
              maximum: { unit: "hour", value: 4 },
            },
          },
        },
      ],
      phone_number_collection: {
        enabled: true,
      },

      line_items,
      customer: customer.id,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/checkout-success`,
      cancel_url: `${process.env.CLIENT_URL}/`,
    });

    res.send({ url: session.url });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post("/webhook", async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let eventType;
  let data;
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req["rawBody"],
      sig,
      process.env.WEB_HOOKS_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  data = event.data.object;
  eventType = event.type;
  // Handle the event
  if (eventType === "checkout.session.completed") {
    let session = await stripe.customers.retrieve(data.customer);
    let line_items = await stripe.checkout.sessions.listLineItems(
      event.data.object.id
    );
    createOrder(session, line_items, data, res);
  }
  res.status(201).send({ success: true }).end();
});
const createOrder = async (customer, lineItems, intent, res) => {
  // Extract cart items from line_items
  const orderItems = await getCartItems(lineItems);
  try {
    const orderId = Date.now();
    const data = {
      intentId: intent.id,
      orderId: orderId,
      amount: intent.amount_total / 100,
      created: intent.created,
      payment_method_types: intent.payment_method_types,
      status: intent.payment_status,
      customer: intent.customer_details,
      shipping_details: intent.shipping_details,
      userId: customer.metadata.user_id,
      items: orderItems,
      total: customer.metadata.total,
      sts: "preparing",
    };
    orderItems.map(async (order) => {
      let activity = {
        id: orderId,
        text: `${customer.metadata.userName} buy the ${order.name}`,
        productName: order.name,
        user: customer.metadata.user,
        item: order,
        time: new Date(),
      };
      await db.collection("activity").doc(`/${orderId}/`).set(activity);
    });
    await db.collection("orders").doc(`/${orderId}/`).set(data);
  } catch (err) {
    console.error(err);
    res
      .status(400)
      .send(`there is problem with create an order ${err.message}`);
  }
};
async function getCartItems(lineItems) {
  return new Promise((resolve, reject) => {
    let cartItems = [];
    lineItems?.data?.forEach(async (item) => {
      const product = await stripe.products.retrieve(item.price.product);
      const productId = product.metadata.id;
      cartItems.push({
        product: productId,
        name: product.name,
        price: item.price.unit_amount / 100, // Convert from cents to dollars
        quantity: item.quantity,
        image: product.images[0],
        category: product.metadata.category,
      });
      if (cartItems.length === lineItems?.data.length) {
        resolve(cartItems);
      }
    });
  });
}
module.exports = router;
