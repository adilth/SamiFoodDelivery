import { useState } from "react";
import { BiPlus } from "@react-icons/all-files/bi/BiPlus";
import { BiMinus } from "@react-icons/all-files/bi/BiMinus";
import { motion } from "framer-motion";
import { useStateValue } from "../context/StateProvider";
import { actionTypes } from "../context/reducer";
import { buttonTap } from "../animations/motion";

function CardItems({ item, flag, setFlag }) {
  const [{ foodCart }, dispatch] = useStateValue();
  const [qty, setQty] = useState(item.qty);

  const updateQty = (action) => {
    let updatedCart = [...foodCart];
    const updatedItem = updatedCart.find((cartItem) => cartItem.id === item.id);
    if (action === "add") {
      setQty((prevQty) => prevQty + 1);
      if (updatedItem) {
        updatedItem.qty += 1;
      }
    } else if (action === "remove") {
      if (qty === 1) {
        // Remove the item from the cart
        updatedCart = updatedCart.filter((cartItem) => cartItem.id !== item.id);
      } else {
        setQty((prevQty) => prevQty - 1);
        // Update the quantity of the item in updatedCart
        if (updatedItem) {
          updatedItem.qty -= 1;
        }
      }
    }
    // Update the cart state
    localStorage.setItem("food", JSON.stringify(updatedCart));
    dispatch({
      type: actionTypes.SET_FOOD_CART,
      foodCart: updatedCart,
    });
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
