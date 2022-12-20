import React from "react";
import Delivery from "../assets/png/pngkey.com-delivery-png-1145548.png";
import HeroImg from "../assets/png/heroBg.png";
import { heroData } from "../utils/data";

function Hero() {
  console.log(heroData);
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full" id="hero">
      <div className="py-4 flex-1 flex flex-col items-start justify-center gap-6">
        <div className="flex items-start gap-2 justify-center bg-orange-100 px-4 py-1 rounded-full">
          <p className="text-base text-orange-500 font-semibolb">
            Bike Delivery
          </p>
          <div className="w-8 h-8 bg-white rounded-full overlay-hidden">
            <img
              src={Delivery}
              alt="bike delivery img"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        <p className="text-[2.5rem] md:text-[3.5rem] lg:text-[4.2rem] font-bold tracking-wide text-headingColor">
          the Fastest Delivery in{" "}
          <span className="text-orange-600 text-[3rem] md:text-[3.75rem] lg:text-[5rem]">
            Your City
          </span>
        </p>
        <p className="text-base text-textColor text-center md:text-left md:w-[80%]">
          Discover local, on-demand delivery or Pickup from restaurants, nearby
          grocery and convenience stores, and more.
        </p>
        <button className="bg-gradient-to-br from-orange-400 to-orange-500 w-full md:w-auto px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100 text-white">
          Order Now
        </button>
      </div>
      <div className="py-4 flex relative">
        <div className="w-full lg:h-650 flex justify-end">
          <img
            src={HeroImg}
            alt="hero image"
            className="h-420 lg:h-full w-full lg:w-auto"
          />
        </div>
        <div className="w-full h-full absolute top-0 left-0 flex gap-4 flex-wrap items-center justify-center px-4 xl:px-20 md:px-8 lg:px-10  pt-5 lg:pt-0">
          {heroData &&
            heroData.map((data) => (
              <div
                key={data.id}
                className=" lg:w-190  p-4 bg-cardOverlay backdrop-blur-md rounded-2xl flex flex-col items-center justify-center drop-shadow-lg"
              >
                <img
                  src={data.src}
                  alt={data.decp}
                  className="w-[6.5rem] md:w-28 lg:w-[8.25rem] -mt-10 lg:-mt-16 "
                />
                <p className="text-ms text-base font-semibold text-textColor mt-1 md:mt-2">
                  {data.name}
                </p>
                <p className=" text-xs text-lighttextGray font-semibold my-1 lg:my-2">
                  {data.decp}
                </p>
                <p className="text-ms font-semibold text-headingColor">
                  <span className="text-xs text-green-700 mr-1">$</span>
                  {data.price}
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
