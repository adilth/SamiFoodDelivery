import React, { useEffect, useState } from "react";
import { useStateValue } from "../context/stateProvider";
import CardShopping from "./CardShopping";
import FoodSection from "./FoodSection";
import Hero from "./Hero";
import MenuSection from "./MenuSection";

const MainContainer = () => {
  const [{ cartShow }, dispatch] = useStateValue();
  useEffect(() => {}, [cartShow]);
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      <Hero />
      <FoodSection />
      <MenuSection />
      {cartShow && <CardShopping />}
    </div>
  );
};

export default MainContainer;
