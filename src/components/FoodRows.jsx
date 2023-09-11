import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Splide, SplideTrack, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { useStateValue } from "../context/stateProvider";
import { actionTypes } from "../context/reducer";
import { Link } from "react-router-dom";
import NotFoundImg from "./NotFoundImg";
import { buttonTap } from "../animations/motion";
import { foodRowsSides } from "../animations/splides";

function FoodRows({ flag, data, splide }) {
  const rowFood = useRef();
  const [{ foodCart }, dispatch] = useStateValue();
  const [dishFood, setDishFood] = useState([...foodCart]);
  // const [loader, setLoader] = useState(true);
  // setInterval(() => {
  //   setLoader(false);
  // }, 1000);
  const addToCart = () => {
    dispatch({
      type: actionTypes.SET_FOOD_CART,
      foodCart: dishFood,
    });
    localStorage.setItem("food", JSON.stringify(dishFood));
  };

  useEffect(() => {
    addToCart();
  }, [dishFood]);

  const handleAddToCart = (item) => {
    let exist = foodCart?.find((el) => el.id === item.id);
    console.log(exist);
    setDishFood((card) => {
      if (exist == null) {
        return [...foodCart, item];
      } else {
        item.qty += 1;
        return [...foodCart];
      }
    });
  };

  let focusStart = `${data?.length > 2 ? "center" : "start"}`;
  const updatedFoodRowsSides = {
    options: {
      ...foodRowsSides.options,
      focus: focusStart,
    },
  };
  if (splide) {
    return (
      <Splide
        ref={rowFood}
        {...updatedFoodRowsSides}
        hasTrack={false}
        className={`food_item w-full my-12 flex items-center justify-start scroll-smooth ${
          flag
            ? "overflow-x-scroll scrollbar-none"
            : "overflow-x-hidden flex-wrap"
        }`}
      >
        <SplideTrack>
          {data && data?.length > 0 ? (
            data.map((item) => (
              <SplideSlide
                key={item.id}
                className=" py-2 bg-cardOverlay rounded-lg hover:drop-shadow-lg flex flex-col justify-evenly relative backdrop-blur-lg"
              >
                <div className="w-full flex items-center cursor-pointer justify-evenly">
                  <ImgLink item={item} />
                  <motion.div
                    {...buttonTap}
                    className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md -mt-8"
                    onClick={() => handleAddToCart(item)}
                  >
                    <FaShoppingCart className="text-white" />
                  </motion.div>
                </div>
                <OtherDetails item={item} />
              </SplideSlide>
            ))
          ) : (
            <NotFoundImg />
          )}
        </SplideTrack>
      </Splide>
    );
  } else {
    return (
      <div
        ref={rowFood}
        className={`w-full my-12 grid ${
          data?.length > 2
            ? "grid-cols-menu_auto_fit"
            : "grid-cols-menu_auto_fit_min"
        } gap-x-4 md:gap-x-6 gap-y-8 px-4 md:px-12`}
      >
        {data && data.length > 0 ? (
          data.map((item) => (
            <div
              key={item.id}
              className=" py-2 bg-cardOverlay rounded-lg hover:drop-shadow-lg flex flex-col justify-evenly relative backdrop-blur-lg"
            >
              <div className="w-full flex items-center justify-evenly">
                <ImgLink item={item} />
                <motion.div
                  whileTap={{ scale: 0.75 }}
                  className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md -mt-8"
                  onClick={() => setDishFood([...dishFood, item])}
                >
                  <FaShoppingCart className="text-white" />
                </motion.div>
              </div>
              <OtherDetails item={item} />
            </div>
          ))
        ) : (
          <NotFoundImg />
        )}
      </div>
    );
  }
}

function OtherDetails({ item }) {
  return (
    <div className="flex flex-col items-end justify-end mt-2 pr-4">
      <p className="text-textColor font-semibold text-base md:text-lg">
        {item?.title}
      </p>
      <p className="mt-1 text-sm text-gray-500"> {item?.calories}</p>
      <div className="flex items-center gap-8">
        <p className="text-lg text-headingColor font-semibold">
          <span className="text-sm to-red-500">${item?.price}</span>
        </p>
      </div>
      <p className=" bg-yellow-400"> ★★★★☆</p>
    </div>
  );
}
export function ImgLink({ item }) {
  return (
    <Link
      to={`/food/${item?.id}`}
      className="w-[68%] drop-shadow-2xl rounded-full"
    >
      <motion.div whileHover={{ scale: 1.1 }}>
        <img
          src={item?.imgURL}
          alt={item?.title}
          className="w-full h-full object-contain rounded-full"
        />
      </motion.div>
    </Link>
  );
}
export default FoodRows;
