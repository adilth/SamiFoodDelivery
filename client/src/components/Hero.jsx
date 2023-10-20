import Delivery from "../assets/png/pngkey.com-delivery-png-1145548.png";
import { Link } from "react-router-dom";
import videoHero from "../assets/png/heroVideo.mp4";
function Hero() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full" id="hero">
      <div className="py-9 xs:py-4 flex-1 flex flex-col items-start justify-center gap-7 xs:gap-6">
        <div
          className="flex items-start gap-2 justify-center bg-orange-100 px-4 py-1 rounded-full"
          aria-hidden="true"
        >
          <p className="text-base text-orange-500 font-semibold ">
            Bike Delivery
          </p>
          <div className="w-8 h-8 bg-white rounded-full overlay-hidden">
            <img
              src={Delivery}
              alt="bike delivery img"
              rel="preload"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        <h1
          className=" text-4xl xs:text-[2.5rem] sm:text-[2.75rem] md:text-[3rem] lg:text-[4rem] leading-none font-bold tracking-wide text-headingColor dark:text-darkHeadingColor"
          aria-labelledby="hero title"
        >
          the Fastest Delivery in{" "}
          <span className="text-orange-700 sm:text-5xl text-[2.75rem] md:text-[3.25rem] lg:text-[4.7rem]">
            Your City
          </span>
        </h1>
        <p className="text-base text-textColor dark:text-darkTextColor text-center md:text-left md:w-[80%]">
          Discover local, on-demand delivery or Pickup from restaurants, nearby
          grocery and convenience stores, and more.
        </p>
        <Link
          aria-label="link to menu page"
          to={"/menu"}
          className="bg-gradient-to-br font-bold from-orange-500 to-orange-600 px-7 py-3 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100 text-white  mx-auto sm:mx-0 whitespace-nowrap"
        >
          Order Now
        </Link>
      </div>
      <div className="hidden sm:py-6 pb-6 pt-0 px-4 md:px-1 xs:flex justify-center relative">
        <div className="ms:w-full sm:w-[80%] sm:h-[80%] xl:h-full flex justify-end">
          <video
            muted
            autoPlay
            loop
            className="lg:h-full w-full lg:w-auto aspect-square rounded-full object-cover"
            aria-label="video in main section"
          >
            <source src={videoHero} type="video/webm" />
          </video>
        </div>
      </div>
    </section>
  );
}

export default Hero;
