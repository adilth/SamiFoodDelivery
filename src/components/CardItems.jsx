import React, { useEffect, useMemo, useState } from "react";
import { BiPlus, BiMinus } from "react-icons/bi";
import { motion } from "framer-motion";
import { useStateValue } from "../context/stateProvider";
import { actionTypes } from "../context/reducer";
import { buttonTap } from "../animations/motion";
let products = [];
function CardItems({ item, setFlag, flag }) {
  const [{ foodCart }, dispatch] = useStateValue();
  // const [items, setItems] = useState([]);
  const [qty, setQty] = useState(item.qty);

  // console.log(products);

  const cartDispatch = () => {
    localStorage.setItem("food", JSON.stringify(products));
    dispatch({
      type: actionTypes.SET_FOOD_CART,
      foodCart: products,
    });
  };

  const updateQty = (action, id) => {
    foodCart.map((food, idx, arr) => {
      if (arr.indexOf(food.id) < 0) return;
    });
    if (action == "add") {
      setQty((prev) => qty + 1);
      foodCart.map((item) => {
        if (item.id === id) {
          item.qty += 1;
          setFlag(flag + 1);
        }
      });
      cartDispatch();
    } else {
      // initial state value is one so you need to check if 1 then remove it
      if (qty == 1) {
        products = foodCart.filter((item) => item.id !== id);
        setFlag(flag + 1);
        cartDispatch();
      } else {
        setQty(qty - 1);
        foodCart.map((item) => {
          if (item.id === id) {
            item.qty -= 1;
            setFlag(flag + 1);
          }
        });
        cartDispatch();
      }
    }
  };
  const productsUpdate = useMemo(() => {
    return { foodCart, qty };
  }, [qty]);

  useEffect(() => {
    products = foodCart;
  }, [productsUpdate]);

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
