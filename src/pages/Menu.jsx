import React, { useEffect, useState } from "react";
import FoodRows from "../components/FoodRows";
import { useStateValue } from "../context/stateProvider";

function Menu() {
  const [{ foodItems }, dispatch] = useStateValue();
  const [scrollValue, setScrollValue] = useState(0);
  useEffect(() => {}, [scrollValue]);
  //  const [filterCategory, setFilterCategory] = useState("Chicken");
  return (
    <section
      id="foodMenu"
      className="w-full h-auto flex flex-col items-center justify-center"
    >
      <div className="w-full flex flex-col items-center justify-between">
        <p className="text-2xl font-semibold capitalize relative text-headingColor before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100">
          Our Menu
        </p>
        <FoodRows
          flag={false}
          data={foodItems}
          splide={false}
          scrollValue={scrollValue}
        />
      </div>
    </section>
  );
}

export default Menu;
