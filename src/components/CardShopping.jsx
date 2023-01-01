import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { RiRefreshFill } from "react-icons/ri";
import { motion } from "framer-motion";
import { useStateValue } from "../context/stateProvider";
import CardItems from "./CardItems";
import { actionTypes } from "../context/reducer";
import EmptyCart from "../assets/img/emptyCart.svg";
import { showMenuCart } from "../utils/getAllData";
// import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

function CardShopping() {
  const [{ foodCart, user }, dispatch] = useStateValue();
  const [flag, setFlag] = useState(1);
  const [tot, setTot] = useState(0);
  const [isPaymentLoading, setPaymentLoading] = useState(false);
  const showCart = showMenuCart();
  useEffect(() => {
    let totalPrice = foodCart?.reduce((accumulator, item) => {
      return accumulator + item?.qty * item?.price;
    }, 0);
    setTot(totalPrice);
    // console.log(foodCart);
  }, [tot, flag]);

  const clearCart = () => {
    dispatch({
      type: actionTypes.SET_FOOD_CART,
      foodCart: [],
    });

    localStorage.setItem("food", JSON.stringify([]));
  };

  // const stripe = useStripe();
  // const elements = useElements();
  // const payMoney = async (e) => {
  //   e.preventDefault();
  //   if (!stripe || !elements) {
  //     return;
  //   }
  //   setPaymentLoading(true);
  //   const clientSecret = getClientSecret();
  //   const paymentResult = await stripe.confirmCardPayment(clientSecret, {
  //     payment_method: {
  //       card: elements.getElement(CardElement),
  //       billing_details: {
  //         name: "adil Yusuff",
  //       },
  //     },
  //   });
  //   setPaymentLoading(false);
  //   if (paymentResult.error) {
  //     alert(paymentResult.error.message);
  //   } else {
  //     if (paymentResult.paymentIntent.status === "succeeded") {
  //       alert("Success!");
  //     }
  //   }
  // };
  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className="fixed top-0 right-0 w-full md:w-275 h-screen bg-white drop-shadow-md flex flex-col z-[333]"
    >
      <div
        className="w-full flex items-center justify-between p-4 cursor-pointer"
        onClick={showCart}
      >
        <motion.div whileTap={{ scale: 0.75 }}>
          <MdOutlineKeyboardBackspace className="text-textColor text-3xl" />
        </motion.div>
        <div className="text-textColor text-lg font-semibold">Cart</div>
        <motion.p
          whileTap={{ scale: 0.82 }}
          onClick={clearCart}
          className="flex items-center gap-2 p-1 bg-gray-100 rounded-md hover:shadow-md cursor-pointer text-textColor text-base"
        >
          Clear <RiRefreshFill />
        </motion.p>
      </div>

      {/* items Section */}
      {foodCart && foodCart?.length > 0 ? (
        <div className="w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col">
          <div className="w-full h-340 md:h-42 px-3 md:px-5 py-4 md:py-8 flex flex-col gap-3 overflow-y-scroll scrollbar-none">
            {/* cart Item */}
            {foodCart &&
              foodCart.length > 0 &&
              foodCart?.map((item) => (
                <CardItems
                  key={item.id}
                  item={item}
                  setFlag={setFlag}
                  flag={flag}
                />
              ))}
          </div>
          {/* cart total section */}
          <div className="w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2">
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Sub Total</p>
              <p className="text-gray-400 text-lg">$ {tot}</p>
            </div>
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Delivery</p>
              <p className="text-red-500 text-lg">$ 2.5</p>
            </div>

            <div className="w-full border-b border-gray-600 my-2"></div>

            <div className="w-full flex items-center justify-between">
              <p className="text-gray-200 text-xl font-semibold">Total:</p>
              <input
                value={tot + 2.5}
                readOnly
                name="total"
                className="text-gray-200 text-xl font-semibold border-none bg-cartTotal ml-2 w-min"
                disabled
              />
            </div>
            {/* <CardElement /> */}
            {user ? (
              <ButtonCheckOut
                disabled={isPaymentLoading}
                text={isPaymentLoading ? "Loading..." : "Pay"}
              />
            ) : (
              <ButtonCheckOut text="Login to Check Out" />
            )}
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-6">
          <img src={EmptyCart} className="w-300" alt="" />
          <p className="text-xl text-textColor font-semibold">
            Add some items to your cart
          </p>
        </div>
      )}
    </motion.div>
  );
}
function ButtonCheckOut({ text }) {
  return (
    <motion.button
      whileTap={{ scale: 0.8 }}
      type="button"
      className="w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg"
    >
      {text}
    </motion.button>
  );
}
export default CardShopping;
