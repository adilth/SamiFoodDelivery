import React, { useEffect, useMemo, useState } from "react";
import { BiPlus, BiMinus } from "react-icons/bi";
import { motion } from "framer-motion";
import { useStateValue } from "../context/stateProvider";
import { actionTypes } from "../context/reducer";
import { buttonTap } from "../animations/motion";

function CardItems({ item, setFlag, flag }) {
  const [{ foodCart }, dispatch] = useStateValue();
  const [updatedCart, setUpdatedCart] = useState([...foodCart]);
  const [qty, setQty] = useState(item.qty);
  const cartDispatch = () => {
    localStorage.setItem("food", JSON.stringify(updatedCart));
    dispatch({
      type: actionTypes.SET_FOOD_CART,
      foodCart: updatedCart,
    });
  };

  const updateQty = (action, id) => {
    if (action === "add") {
      setQty((prev) => prev + 1);
      foodCart.map((item) => {
        if (item.id === id) {
          item.qty += 1;
          setFlag(flag + 1);
        }
      });
      cartDispatch();
    } else {
      if (qty === 1) {
        setUpdatedCart(updatedCart.filter((item) => item.id !== id));
        setFlag(flag + 1);
        cartDispatch();
      } else {
        setQty((prev) => prev - 1);
        foodCart.map((item) => {
          if (item.id === id) {
            item.qty -= 1;
            setFlag(flag + 1);
          }
        });
        cartDispatch();
      }
    }

    setFlag(flag + 1);
  };

  return (
    <div className="w-full p-1 rounded-lg bg-cardItem flex items-center gap-2">
      <img
        src={item?.imgURL}
        alt={item?.title}
        className="w-20 h-20 max-w-[60px] rounded-full object-contain"
      />
      {/* name item section  */}
      <div className="flex flex-col gap-2">
        <p className="text-base text-gray-50">{item?.title}</p>
        <p className="text-sm block font-semibold text-green-400">
          $ {parseFloat(item?.price) * qty}
        </p>
      </div>
      {/* buttons section */}
      <div className="group flex items-center gap-2 ml-auto cursor-pointer">
        <motion.div
          {...buttonTap}
          onClick={() => updateQty("remove", item?.id)}
        >
          <BiMinus className="text-gray-50" />
        </motion.div>
        <p className="w-5 h-5 rounded-sm bg-cartBg text-gray-50 flex items-center justify-center">
          {qty}
        </p>
        <motion.div {...buttonTap} onClick={() => updateQty("add", item?.id)}>
          <BiPlus className="text-gray-50 " />
        </motion.div>
      </div>
    </div>
  );
}

export default CardItems;
