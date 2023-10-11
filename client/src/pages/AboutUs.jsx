import React from "react";
import image from "../assets/img/background_image.jpg";
import { Link } from "react-router-dom";

function AboutUs() {
  return (
    <div className="about-us">
      <div className="p-2 w-full h-full">
        <div
          className="px-4 text-center p-10"
          style={{
            background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)) , url(${image})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Background image */}
          <div className="intro-content">
            <h1 className="text-[2.5rem] md:text-[3rem] lg:text-[4rem] font-bold tracking-wide text-darkHeadingColor">
              Welcome to SamiFood
            </h1>
            <p className="mb-9 mt-2 text-darkHeadingColor md:w-[65ch] mx-auto">
              Explore a world of delicious food and refreshing drinks, delivered
              right to your doorstep. Let&#39;s satisfy your cravings!
            </p>
            <a
              href="/"
              className="bg-gradient-to-br font-bold from-orange-500 to-orange-600 px-7 py-3 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100 text-white mx-auto sm:mx-0"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>

      <div className="p-2 mt-4">
        <h2 className="text-2xl font-semibold capitalize relative text-headingColor dark:text-darkHeadingColor before:absolute before:rounded-lg before:content before:w-16 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100 mr-auto mb-6">
          Our Story
        </h2>
        <p className="md:w-[70ch]">
          Founded with a passion for culinary excellence, SamiFood has been
          serving the local community with mouthwatering dishes since 2020. From
          our talented chefs to our friendly delivery team, our mission is to
          provide you with a memorable dining experience every time you order
          from us.
        </p>
      </div>
      <div className="p-2 mt-4">
        <h2 className="text-2xl font-semibold capitalize relative text-headingColor dark:text-darkHeadingColor before:absolute before:rounded-lg before:content before:w-16 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100 mr-auto mb-6">
          What they say about us
        </h2>
        <div id="testimonial" className=" flex gap-6">
          <div className="p-3 md:p-6 bg-card dark:bg-darkCardOverlay">
            <p className="mb-4">
              &ldquo;SamiFood has become my favorite go-to restaurant for food
              delivery. The quality and taste are exceptional!&ldquo;
            </p>
            <p className=" text-sm dark:text-darkTextColor text-textColor">
              - John, a satisfied customer
            </p>
          </div>
          <div className="p-3 md:p-6 bg-card dark:bg-darkCardOverlay">
            <p className="mb-4">
              &ldquo;SamiFood is my go-to choice for food delivery. Their menu
              is diverse, and the quality of the food is always
              top-notch!&ldquo;
            </p>
            <p className=" text-sm dark:text-darkTextColor text-textColor">
              - Sarah, a satisfied customer
            </p>
          </div>

          <div className="p-3 md:p-6 bg-card dark:bg-darkCardOverlay">
            <p className="mb-4">
              &ldquo;I&#39;ve tried many food delivery services, but SamiFood
              stands out for its exceptional service and taste. Highly
              recommended!&ldquo;
            </p>
            <p className=" text-sm dark:text-darkTextColor text-textColor">
              - Mark, a loyal customer
            </p>
          </div>
        </div>
      </div>
      <div className="p-2 mt-6">
        <h2 className="text-2xl font-semibold capitalize relative text-headingColor dark:text-darkHeadingColor before:absolute before:rounded-lg before:content before:w-16 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100 mr-auto mb-6">
          Our Menu
        </h2>
        <p className="md:w-[70ch]">
          Explore our diverse menu that caters to all taste buds. Whether you
          crave savory pizzas, flavorful Asian dishes, hearty burgers, or sweet
          desserts, we have it all. Don&#39;t forget to complement your meal
          with our selection of beverages, including refreshing sodas, juices,
          and more.
          <Link
            to={"/menu"}
            className="text-red-700 px-2 underline underline-offset-2 hover:text-orange-700 transition-colors ease-in-out duration-200"
          >
            Go to Menu
          </Link>
        </p>
      </div>
      <div className="p-2 mt-4">
        <h2 className="text-2xl font-semibold capitalize relative text-headingColor dark:text-darkHeadingColor before:absolute before:rounded-lg before:content before:w-16 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100 mb-6">
          Why Choose SamiFood?
        </h2>
        <p>
          - Quality Ingredients: We source the freshest ingredients to ensure
          every dish is packed with flavor.
          <br />
          - Fast and Reliable: Our dedicated delivery team ensures your order
          reaches you hot and on time.
          <br />
          - Customer Satisfaction: Your satisfaction is our priority, and we
          strive to exceed your expectations.
          <br />- Convenience: Ordering from SamiFood is easy, with online
          ordering and payment options.
        </p>
      </div>
      <div className="p-2 mt-4">
        <h2 className="text-2xl font-semibold capitalize relative text-headingColor dark:text-darkHeadingColor before:absolute before:rounded-lg before:content before:w-16 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100 mr-auto mb-6">
          Contact Us
        </h2>
        <p className="md:w-[70ch]">
          Have questions or feedback? We&#39;d love to hear from you. Reach out
          to our customer support team at support@samifood.com or contact us{" "}
          <Link
            to={"/contact"}
            className="text-red-700 px-2 underline underline-offset-2 hover:text-orange-700 transition-colors ease-in-out duration-200"
          >
            Here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default AboutUs;
