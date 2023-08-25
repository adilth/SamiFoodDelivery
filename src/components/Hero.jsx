import React from "react";
import Delivery from "../assets/png/pngkey.com-delivery-png-1145548.png";
import HeroImg from "../assets/png/c983b457564097.59db4a734d0d5.gif";
import { heroData } from "../utils/data";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full" id="hero">
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
        <p className="text-[2.5rem] md:text-[3.5rem] lg:text-[4rem] font-bold tracking-wide text-headingColor">
          the Fastest Delivery in{" "}
          <span className="text-orange-600 text-[3rem] md:text-[3.75rem] lg:text-[4.7rem]">
            Your City
          </span>
        </p>
        <p className="text-base text-textColor text-center md:text-left md:w-[80%]">
          Discover local, on-demand delivery or Pickup from restaurants, nearby
          grocery and convenience stores, and more.
        </p>
        <Link
          to={"/menu"}
          className="bg-gradient-to-br font-bold from-orange-400 to-orange-500 px-7 py-3 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100 text-white mx-auto sm:mx-0"
        >
          Order Now
        </Link>
      </div>
      <div className="sm:py-6 pb-6 pt-0 px-4 md:px-1 flex justify-center relative">
        <div className="ms:w-full w-[80%] flex justify-end">
          <img
            src={HeroImg}
            alt="hero image"
            className="lg:h-full w-full lg:w-auto rounded-full"
          />
        </div>
        {/* <div className="w-full xlg:w-[80%] h-full absolute top-0 right-0 grid grid-cols-2 snap-center gap-10 sm:gap-6   px-8 sm:px-3 xl:px-20 lg:px-4 pt-5 lg:pt-0 place-items-center ">
          {heroData &&
            heroData.map((data) => (
              <div
                key={data.id}
                className=" lg:w-190 bg-cardOverlay backdrop-blur-md rounded-2xl flex flex-col items-center justify-center drop-shadow-lg px-7 md:px-3"
              >
                <img
                  src={data.src}
                  alt={data.decp}
                  className="w-[7rem] md:w-32  lg:w-[8.25rem] -mt-10 lg:-mt-16 "
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
        </div> */}
      </div>
    </section>
  );
}

export default Hero;
