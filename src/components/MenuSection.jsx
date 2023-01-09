import React, { useState } from "react";
import { motion } from "framer-motion";
import { categories } from "../utils/data";
import { IoFastFood } from "react-icons/io5";
import { useStateValue } from "../context/stateProvider";
import FoodRows from "./FoodRows";
import { Splide, SplideSlide } from "@splidejs/react-splide";
function MenuSection() {
  const [{ foodItems }, dispatch] = useStateValue();
  const [filterCategory, setFilterCategory] = useState("Chicken");
  return (
    <section className="w-full my-6" id="Menu">
      <div className="w-full flex flex-col items-center justify-center">
        <p className="text-2xl font-semibold capitalize relative text-headingColor before:absolute before:rounded-lg before:content before:w-16 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100 mr-auto">
          Our Popular Dishes
        </p>

        <div className="w-full">
          <MenuFilterCategory
            filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
          />
          <FoodRows
            flag={false}
            data={foodItems?.filter((n) => n.category == filterCategory)}
            splide={true}
          />
        </div>
      </div>
    </section>
  );
}
function MenuFilterCategory({ filterCategory, setFilterCategory }) {
  return (
    <Splide
      options={{
        arrows: false,
        drag: true,
        perPage: 8,
        focus: "center",
        breakpoints: {
          1080: {
            perPage: 6.5,
          },
        },
        gap: "2rem",
      }}
      className="w-full flex items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll scrollbar-none"
    >
      {categories &&
        categories.map((category) => (
          <SplideSlide
            key={category.id}
            className={`group ${
              filterCategory == category.URLSearchParams
                ? "bg-cartNumBg"
                : "bg-card"
            } w-24 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center hover:bg-cartNumBg `}
            onClick={() => setFilterCategory(category.URLSearchParams)}
          >
            <motion.div
              whileTap={{ scale: 0.75 }}
              className="flex flex-col items-center justify-center"
            >
              <div
                className={`w-10 h-10 rounded-full shadow-lg ${
                  filterCategory === category.URLSearchParams
                    ? "bg-white"
                    : "bg-cartNumBg"
                } group-hover:bg-white flex items-center justify-center`}
              >
                <IoFastFood
                  className={`${
                    filterCategory === category.URLSearchParams
                      ? "text-textColor"
                      : "text-white"
                  } group-hover:text-textColor text-lg`}
                />
              </div>
              <p
                className={`text-sm ${
                  filterCategory === category.URLSearchParams
                    ? "text-white"
                    : "text-textColor"
                } group-hover:text-white`}
              >
                {category.name}
              </p>
            </motion.div>
          </SplideSlide>
        ))}
    </Splide>
  );
}

export default MenuSection;
