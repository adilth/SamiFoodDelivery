import React from "react";
import FoodSection from "./FoodSection";
import Hero from "./Hero";

const MainContainer = () => {
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      <Hero />
      <FoodSection />
    </div>
  );
};

export default MainContainer;
