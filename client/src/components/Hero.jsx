import Delivery from "../assets/png/pngkey.com-delivery-png-1145548.png";
import HeroImg from "../assets/png/c983b457564097.59db4a734d0d5.gif";
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
        <p className="text-[2.5rem] md:text-[3.5rem] lg:text-[4rem] font-bold tracking-wide text-headingColor dark:text-darkHeadingColor">
          the Fastest Delivery in{" "}
          <span className="text-orange-600 text-[3rem] md:text-[3.75rem] lg:text-[4.7rem]">
            Your City
          </span>
        </p>
        <p className="text-base text-textColor dark:text-darkTextColor text-center md:text-left md:w-[80%]">
          Discover local, on-demand delivery or Pickup from restaurants, nearby
          grocery and convenience stores, and more.
        </p>
        <Link
          to={"/menu"}
          className="bg-gradient-to-br font-bold from-orange-400 to-orange-500 px-7 py-3 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100 text-white  mx-auto sm:mx-0"
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
      </div>
    </section>
  );
}

export default Hero;
