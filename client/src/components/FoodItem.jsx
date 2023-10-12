import { motion } from "framer-motion";
import { FaShoppingCart } from "@react-icons/all-files/fa/FaShoppingCart";
import { Link } from "react-router-dom";
import { buttonTap } from "../animations/motion";
import { useEffect, useState } from "react";
import { getCommentOnId } from "../utils/firebaseFunc";
import RatingReviews from "./foodDetails/RatingReviews";

function FoodItem({ item, handleAddToCart }) {
  return (
    <div className="py-4 h-full bg-cardOverlay gap-3 dark:bg-darkCardOverlay rounded-lg hover:drop-shadow-lg flex flex-col justify-evenly relative backdrop-blur-lg">
      <div className="w-full flex items-center cursor-pointer justify-evenly">
        <ImgLink item={item} />
        <motion.div
          {...buttonTap}
          className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md -mt-8"
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
  const [comments, setComments] = useState([]);
  useEffect(() => {
    // Fetch comments for the specific dishFood
    getCommentOnId(item.id).then((commentsData) => {
      setComments(commentsData);
    });
  }, [item.id]);
  return (
    <div className="flex flex-col items-end justify-end mt-3 pr-4">
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
      <RatingReviews comments={comments} size={"w-4 h-4"} />
    </div>
  );
}
function ImgLink({ item }) {
  return (
    <Link
      to={`/food/${item?.id}`}
      className="w-[70%] h-[71%] drop-shadow-2xl rounded-full"
    >
      <motion.div whileHover={{ scale: 1.1 }}>
        <img
          src={item?.imgURL}
          alt={item?.title}
          className="w-full aspect-square object-contain rounded-full scale-95"
        />
      </motion.div>
    </Link>
  );
}

export default FoodItem;
