import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import FoodRows from "./FoodRows";
import { useStateValue } from "../context/stateProvider";

function FoodSection() {
  const [scrollValue, setScrollValue] = useState(0);
  const [{ foodItems }, dispatch] = useStateValue();
  useEffect(() => {}, [scrollValue]);
  return (
    <section className="w-full my-4" id="FoodMenu">
      <div className="w-full flex items-center justify-between">
        <p className="text-2xl font-semibold capitalize relative text-headingColor before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100">
          check all Fresh & healthy Food
        </p>
        <div className="hidden md:flex gap-3 items-center">
          <SwipedSquare onClick={() => setScrollValue(scrollValue)}>
            <MdChevronLeft className="text-lg text-white prev_arrow" />
          </SwipedSquare>

          <SwipedSquare onClick={() => setScrollValue(scrollValue)}>
            <MdChevronRight className="text-lg text-white next_arrow" />
          </SwipedSquare>
        </div>
      </div>

      <FoodRows flag={true} data={foodItems} scrollValue={scrollValue} />
    </section>
  );
}

function SwipedSquare({ children, onClick, number }) {
  return (
    <motion.div
      whileTap={{ scale: 0.75 }}
      onClick={() => onClick(number)}
      className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer hover:shadow-lg flex items-center justify-center"
    >
      {children}
    </motion.div>
  );
}

export default FoodSection;
