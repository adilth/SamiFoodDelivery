import { Header } from "../components";
import { motion } from "framer-motion";
import { buttonTap } from "../animations/motion";
import IMGSUCC from "../assets/img/bill.jpg";
import { NavLink } from "react-router-dom";
import { FaArrowLeft } from "@react-icons/all-files/fa/FaArrowLeft";
import { useStateValue } from "../context/StateProvider";
import { actionTypes } from "../context/reducer";
import { useEffect } from "react";

function Success() {
  const [, dispatch] = useStateValue();

  useEffect(() => {
    const clearCart = () => {
      dispatch({
        type: actionTypes.SET_FOOD_CART,
        foodCart: [],
      });

      localStorage.setItem("food", JSON.stringify([]));
    };
    let timeOut = setTimeout(() => {
      clearCart();
    }, 1);
    return () => clearTimeout(timeOut);
  }, [dispatch]);
  return (
    <main className=" w-screen min-h-screen flex items-center justify-start flex-col">
      <Header />
      <div className="w-full flex flex-col items-center justify-center mt-40 px-6 md:px-24 2xl:px-96 gap-12 pb-24">
        <img
          src={IMGSUCC}
          className="w-full md:w-656"
          alt="image of success payment"
        />

        <h1 className="text-[50px] text-headingColor dark:text-darkHeadingColor font-bold">
          Amount paid Successfully
        </h1>

        <motion.div {...buttonTap}>
          <NavLink
            to={"/"}
            className="flex items-center justify-center gap-4 cursor-pointer text-2xl text-textColor dark:text-darkHeadingColor font-semibold px-4 py-2 rounded-md border border-gray-300 hover:shadow-md"
          >
            <FaArrowLeft className="text-3xl text-textColor dark:text-darkTextColor" />{" "}
            Get back to Home
          </NavLink>
        </motion.div>
      </div>
    </main>
  );
}

export default Success;
