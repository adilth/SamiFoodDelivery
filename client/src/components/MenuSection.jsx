import { useState } from "react";
import { motion } from "framer-motion";
import { categories } from "../utils/data";
import { IoFastFood } from "@react-icons/all-files/io5/IoFastFood";
import { useStateValue } from "../context/StateProvider";
import FoodRows from "./FoodRows";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { splideMenu } from "../animations/splides";
import { buttonTap } from "../animations/motion";

function MenuSection() {
  const [{ foodItems }] = useStateValue();
  const [filterCategory, setFilterCategory] = useState("Chicken");
  return (
    <section className="w-full my-6" id="Menu">
      <div className="w-full flex flex-col items-center justify-center">
        <h2 className="text-2xl font-semibold capitalize relative text-headingColor dark:text-darkHeadingColor before:absolute before:rounded-lg before:content before:w-16 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100 mr-auto">
          Our Popular Dishes
        </h2>

        <div className="w-full">
          <MenuFilterCategory
            filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
          />
          <FoodRows
            flag={false}
            data={foodItems?.filter((n) => n.category == filterCategory)}
            splide
          />
        </div>
      </div>
    </section>
  );
}
function MenuFilterCategory({ filterCategory, setFilterCategory }) {
  return (
    <Splide
      {...splideMenu}
      className="w-full flex items-center  justify-start lg:justify-center gap-8 py-6"
    >
      {categories &&
        categories.map((category) => (
          <SplideSlide
            key={category.id}
            className={`group ${
              filterCategory == category.URLSearchParams
                ? "bg-cartNumBg"
                : "bg-card dark:bg-darkCardOverlay"
            } w-24 min-w-[94px] h-28 cursor-pointer relative rounded-lg flex flex-col gap-3 items-center justify-center hover:bg-cartNumBg transition-colors duration-200 ease-in-out before:absolute before:content-[''] before:w-34 before:h-28 before:rounded-lg before:-left-2 before:-right-2 before:bg-opacity-10  before:bg-gray-300 dark:before:bg-neutral-800 dark:before:bg-opacity-20  before:-z-10`}
            onClick={() => setFilterCategory(category.URLSearchParams)}
          >
            <motion.div
              {...buttonTap}
              className="flex flex-col items-center justify-center"
            >
              <div
                className={`w-10 h-10 rounded-full shadow-lg ${
                  filterCategory === category.URLSearchParams
                    ? "bg-white"
                    : "bg-cartNumBg"
                } group-hover:bg-white flex items-center justify-center transition-colors duration-150 ease-in`}
              >
                <IoFastFood
                  className={`${
                    filterCategory === category.URLSearchParams
                      ? "text-textColor "
                      : "text-white"
                  } group-hover:text-textColor text-lg`}
                />
              </div>
              <p
                className={`text-sm ${
                  filterCategory === category.URLSearchParams
                    ? "text-white"
                    : "text-textColor dark:text-darkTextColor"
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
