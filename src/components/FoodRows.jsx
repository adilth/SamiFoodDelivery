import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Splide, SplideTrack, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import NotFound from "../assets/img/NotFound.svg";
import { useStateValue } from "../context/stateProvider";
import { actionTypes } from "../context/reducer";

function FoodRows({ flag, data, scrollValue }) {
  const rowFood = useRef();
  const [{ foodCart }, dispatch] = useStateValue();
  const [dishFood, setDishFood] = useState(foodCart);
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
  useEffect(() => {
    rowFood.current.scrollLeft += scrollValue;
  }, [scrollValue]);
  useEffect(() => {
    if (rowFood.current) {
      scrollValue += rowFood.current.splide.Components.Controller.getNext(
        rowFood.current.splide.length - 1
      );
      console.log(
        rowFood.current.splide.Components.Controller.getNext(
          rowFood.current.splide.length - 1
        )
      );
    }
  }, [scrollValue]);

  return (
    <Splide
      onArrowsMounted={{
        splide: "food_item",
        prev: "prev_arrow",
        next: "next_arrow",
      }}
      ref={rowFood}
      options={{
        perPage: 4,
        breakpoints: {
          1080: {
            perPage: 3,
            gap: "1.5rem",
          },
          622: {
            perPage: 2,
            gap: "1.5rem",
          },
        },
        rewind: true,
        arrows: false,
        drag: "free",
        gap: "1rem",
      }}
      hasTrack={false}
      className={`food_item w-full my-12 flex items-center scroll-smooth ${
        flag
          ? "overflow-x-scroll scrollbar-none"
          : "overflow-x-hidden flex-wrap justify-center"
      }`}
    >
      <SplideTrack>
        {data && data.length > 0 ? (
          data.map((item) => (
            <SplideSlide
              key={item.id}
              className=" py-2 bg-cardOverlay rounded-lg hover:drop-shadow-lg flex flex-col justify-evenly relative backdrop-blur-lg"
            >
              <div className="w-full flex items-center justify-evenly">
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className="w-[68%] drop-shadow-2xl"
                >
                  <img
                    src={item?.imgURL}
                    alt={item?.title}
                    className="w-full h-full object-contain"
                  />
                </motion.div>
                <motion.div
                  whileTap={{ scale: 0.75 }}
                  className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md -mt-8"
                  onClick={() => setDishFood([...foodCart, item])}
                >
                  <FaShoppingCart className="text-white" />
                </motion.div>
              </div>
              <div className="flex flex-col items-end justify-end mt-2 pr-4">
                <p className="text-textColor font-semibold text-base md:text-lg ">
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
            </SplideSlide>
          ))
        ) : (
          <div className="w-full flex flex-col items-center justify-center">
            <img src={NotFound} className="h-340" />
            <p className="text-xl text-headingColor font-semibold my-2">
              Items Not Available
            </p>
          </div>
        )}
      </SplideTrack>
    </Splide>
  );
}

export default FoodRows;
