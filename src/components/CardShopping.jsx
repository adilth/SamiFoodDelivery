import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { RiRefreshFill } from "react-icons/ri";
import { motion } from "framer-motion";
import { useStateValue } from "../context/stateProvider";
import CardItems from "./CardItems";
import { actionTypes } from "../context/reducer";
import EmptyCart from "../assets/img/emptyCart.svg";
import { showMenuCart } from "../utils/getAllData";
import {
  buttonTap,
  buttonTapSoft,
  fadeInOutWithTransition,
} from "../animations/motion";

function CardShopping() {
  const [{ foodCart, user }, dispatch] = useStateValue();
  const [flag, setFlag] = useState(1);
  const [tot, setTot] = useState(0);
  const [isPaymentLoading, setPaymentLoading] = useState(false);
  const showCart = showMenuCart();

  useEffect(() => {
    let totalPrice = foodCart?.reduce((acc, item) => {
      return acc + item?.qty * item?.price;
    }, 0);
    setTot(totalPrice);
  }, [foodCart]);

  const clearCart = () => {
    dispatch({
      type: actionTypes.SET_FOOD_CART,
      foodCart: [],
    });

    localStorage.setItem("food", JSON.stringify([]));
  };

  return (
    <div className="fixed top-0 right-0 left-0 bottom-0 w-full h-screen bg-cardOverlayCart z-[233]">
      <motion.div {...fadeInOutWithTransition}>
        <div
          className="w-full flex items-center justify-between p-4 cursor-pointer"
          onClick={showCart}
        >
          <motion.div {...buttonTap}>
            <MdOutlineKeyboardBackspace className="text-textColor text-3xl" />
          </motion.div>
          <div className="text-textColor text-lg font-semibold">Cart</div>
          <motion.p
            {...buttonTapSoft}
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
            <img src={EmptyCart} className="w-300" alt="add more item image" />
            <p className="text-xl text-textColor font-semibold">
              Add some items to your cart
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
function ButtonCheckOut({ text }) {
  return (
    <motion.button
      {...buttonTap}
      type="button"
      className="w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg"
    >
      {text}
    </motion.button>
  );
}
export default CardShopping;
