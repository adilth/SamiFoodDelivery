import { motion } from "framer-motion";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import { buttonTap } from "../animations/motion";

function FoodItem({ item, handleAddToCart }) {
  return (
    <div className="py-2 h-full bg-cardOverlay gap-3 dark:bg-darkCardBody rounded-lg hover:drop-shadow-lg flex flex-col justify-evenly relative backdrop-blur-lg">
      <div className="w-full flex items-center cursor-pointer justify-evenly">
        <ImgLink item={item} />
        <motion.div
          {...buttonTap}
          className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md -mt-8"
          onClick={() => handleAddToCart(item)}
        >
          <FaShoppingCart className="text-white" />
        </motion.div>
      </div>
      <OtherDetails item={item} />
    </div>
  );
}
function OtherDetails({ item }) {
  return (
    <div className="flex flex-col items-end justify-end mt-2 pr-4">
      <p className="text-textColor dark:text-darkTextColor font-semibold text-base md:text-lg">
        {item?.title}
      </p>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        {" "}
        {item?.calories}
      </p>
      <div className="flex items-center gap-8">
        <p className="text-lg text-headingColor dark:text-darkHeadingColor font-semibold">
          <span className="text-sm to-red-500">${item?.price}</span>
        </p>
      </div>
      <Rating rating={4} size={"w-5 h5"} readOnly />
    </div>
  );
}
export function ImgLink({ item }) {
  return (
    <Link
      to={`/food/${item?.id}`}
      className="w-[66%] h-[70%] drop-shadow-2xl rounded-full"
    >
      <motion.div whileHover={{ scale: 1.1 }}>
        <img
          src={item?.imgURL}
          alt={item?.title}
          className="w-full aspect-[8/9] object-contain rounded-full"
        />
      </motion.div>
    </Link>
  );
}

export default FoodItem;
