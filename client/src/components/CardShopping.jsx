import { useCallback, useEffect, useState } from "react";
import { BsArrowLeft } from "@react-icons/all-files/bs/BsArrowLeft";
import { RiRefreshFill } from "@react-icons/all-files/ri/RiRefreshFill";
import { motion } from "framer-motion";
import { useStateValue } from "../context/StateProvider";
import CardItems from "./CardItems";
import { actionTypes } from "../context/reducer";
import EmptyCart from "../assets/img/emptyCart.svg";
import { useShowCard } from "../utils/getAllData";
import {
  buttonTap,
  buttonTapSoft,
  fadeInOutWithTransition,
} from "../animations/motion";
import { useRef } from "react";
import { useAlertState } from "../context/alertProvider";
import { alertActionTypes } from "../context/alertReducer";
import Loader from "./Loader";
import { useFoodValue } from "../context/FoodProvider";

const baseURL = import.meta.env.VITE_BASED_URL || "http://localhost:3333";
function CardShopping() {
  const [{ foodCart }, dispatch] = useFoodValue();
  const [{ user }] = useStateValue();
  const { setAlert } = useAlertState();
  const [flag, setFlag] = useState(1);
  const [tot, setTot] = useState(0);
  const [loading, setLoading] = useState(false);
  const showCart = useShowCard();
  const cardMenu = useRef();

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
  const handleCheckOut = useCallback(async () => {
    setLoading(true);
    const data = {
      user: user,
      cart: foodCart,
      total: tot,
    };
    await fetch(`${baseURL}/api/products/create-checkout-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.url) {
          setLoading(false);
          window.location.href = res.url;
        }
      })
      .catch((err) => {
        console.error(err);
        setAlert(alertActionTypes.SET_DANGER, "something went wrong");
        setTimeout(() => {
          setAlert(alertActionTypes.SET_ALERT_NULL, "");
        }, 3000);
      });
  }, [foodCart, tot, user, setAlert]);

  return (
    <motion.div
      {...fadeInOutWithTransition}
      ref={cardMenu}
      className="fixed top-0 right-0 left-0 bottom-0 w-full h-screen bg-cardOverlayCart z-[233]"
    >
      <div className="absolute top-0 right-0 w-full md:w-275 lg:w-300 h-screen bg-white dark:bg-darkPrimary drop-shadow-md flex flex-col z-[333]">
        <div
          className="w-full flex items-center justify-between p-4 cursor-pointer"
          onClick={showCart}
        >
          <motion.div {...buttonTap}>
            <BsArrowLeft className="text-textColor dark:text-darkTextColor text-3xl rotate-180" />
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
          <div className="w-full h-full bg-cartBg dark:bg-darkCardOverlay rounded-t-[2rem] flex flex-col">
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
            <div className="w-full flex-1 bg-cartTotal dark:bg-darkPrimary rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2">
              <div className="w-full flex items-center justify-between">
                <p className="text-gray-400 text-lg">Sub Total</p>
                <p className="text-gray-400 text-lg">$ {tot.toFixed(2)}</p>
              </div>
              <div className="w-full flex items-center justify-between">
                <p className="text-gray-400 text-lg">Delivery</p>
                <p className="text-red-500 text-lg">$ 2.5</p>
              </div>

              <div className="w-full border-b border-gray-600 my-2" />

              <div className="w-full flex items-center justify-between">
                <p className="text-gray-200 text-xl font-semibold">Total:</p>
                <input
                  value={Number(tot + 2.5).toFixed(2)}
                  readOnly
                  name="total"
                  className="text-gray-200 text-xl font-semibold border-none bg-cartTotal dark:bg-darkCardOverlay ml-2 w-min"
                  disabled
                />
              </div>
              {/* <CardElement /> */}
              {user ? (
                <ButtonCheckOut onClick={handleCheckOut}>
                  Check Out {loading && <Loader inside />}
                </ButtonCheckOut>
              ) : (
                <ButtonCheckOut>Login to Check Out</ButtonCheckOut>
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
      </div>
    </motion.div>
  );
}
function ButtonCheckOut({ children, onClick, loading }) {
  return (
    <motion.button
      onClick={onClick}
      {...buttonTap}
      type="button"
      disabled={loading}
      className="w-full flex justify-center p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg"
    >
      {children}
    </motion.button>
  );
}
export default CardShopping;
