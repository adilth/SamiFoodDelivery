import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import FoodRows from "./FoodRows";
import { useStateValue } from "../context/stateProvider";
import Loader from "./Loader";
import { fadeInOut } from "../animations/motion";

function FoodSection() {
  const [{ foodItems }] = useStateValue();
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    setInterval(() => {
      setLoader(false);
    }, 300);
  }, []);
  console.log("here");
  return (
    <section className="w-full my-4" id="FoodMenu">
      <div className="w-full flex items-center justify-between">
        <p className="text-2xl font-semibold capitalize relative text-headingColor dark:text-darkHeadingColor before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100">
          check all Fresh & healthy Food
        </p>
      </div>
      {loader ? (
        <motion.div
          {...fadeInOut}
          className="flex items-center justify-center h-full"
        >
          <Loader />
        </motion.div>
      ) : (
        <FoodRows
          flag
          data={foodItems?.filter((n) => n.vegan == "vegan")}
          splide
        />
      )}
    </section>
  );
}

export default FoodSection;
