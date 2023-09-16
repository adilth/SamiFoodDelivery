const router = require("express").Router();
const admin = require("firebase-admin");
const db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true });
const stripe = require("stripe")(process.env.STRIPE_KEY);
// const express = require("express");
router.post("/create-checkout-session", async (req, res) => {
  const customer = await stripe.customers.create({
    metadata: {
      user_id: req.body.data.user.uid.toString(),
      // cart: JSON.stringify(req.body.data.cart),
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
          },
        },
        unit_amount: item.price * 100,
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
    let session = await stripe.customers.retrieve(data.customer, {
      expand: ["payment_intent.payment_method", "customer"],
    });

    // createOrder(customer, data, res);
    console.log("Customer details", session);
    console.log("Data", data);
  }
  // Return a 200 res to acknowledge receipt of the event
  res.send().end();
});
// const createOrder = async (customer, intent, res) => {
//   // Extract cart items from line_items
//   const cartItems = intent.display_items.map((item) => ({
//     name: item.custom.name,
//     price: item.amount, // Convert from cents to dollars
//     quantity: item.quantity,
//     product_id: item.custom.id,
//     image: item.custom.images[0], // Assuming there's always at least one image
//   }));

//   try {
//     const orderId = Date.now();
//     const data = {
//       intentId: intent.id,
//       orderId: orderId,
//       amount: intent.amount_total,
//       created: intent.created,
//       payment_method_types: intent.payment_method_types,
//       status: intent.payment_status,
//       customer: intent.customer_details,
//       shipping_details: intent.shipping_details,
//       userId: customer.metadata.user_id,
//       items: JSON.parse(cartItems),
//       total: customer.metadata.total,
//       sts: "preparing",
//     };
//     await db.collection("orders").doc(`/${orderId}/`).set(data);

//     return res.status(200).send({ success: true });
//   } catch (err) {
//     console.log(err);
//     res
//       .status(400)
//       .send(`there is problem with create an order ${err.message}`);
//   }
// };
module.exports = router;
