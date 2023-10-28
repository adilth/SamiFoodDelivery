import { Suspense, lazy, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FaShoppingCart } from "@react-icons/all-files/fa/FaShoppingCart";
import { actionTypes } from "../context/reducer";
import { Loader } from "../components";
import { getCommentOnId } from "../utils/firebaseFunc";
import RatingReviews from "../components/foodDetails/RatingReviews";
import { useFoodValue } from "../context/FoodProvider";
const Comments = lazy(() => import("../components/foodDetails/Comments"));
const FoodRows = lazy(() => import("../components/FoodRows"));
function FoodDetails() {
  const { nameId } = useParams();
  const [{ foodItems, foodCart }, dispatch] = useFoodValue();
  const [dishFood, setDishFood] = useState(foodCart);
  const [details, setDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);
  useEffect(() => {
    // Fetch comments for the specific dishFood
    getCommentOnId(details.id).then((commentsData) => {
      setComments(commentsData);
    });
  }, [details.id]);

  useEffect(() => {
    const getFoodDetails = () => {
      const detailsFood = foodItems.find((item) => item.id == nameId);

      setDetails(detailsFood);
      setIsLoading(false);
    };
    getFoodDetails();
  }, [nameId, foodItems]);

  useEffect(() => {
    const addToCart = () => {
      dispatch({
        type: actionTypes.SET_FOOD_CART,
        foodCart: dishFood,
      });
      localStorage.setItem("food", JSON.stringify(dishFood));
    };
    addToCart();
  }, [dishFood, dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [dishFood]);

  return (
    <section
      id="food-Details"
      className="p-2 sm:p-4 mt-3 flex flex-col justify-center "
    >
      <div className="grid grid-cols-2 gap-2 sm:gap-4 md:gap-8 mb-10">
        {isLoading && <Loader />}
        <div className="w-full flex md:justify-center">
          <img
            src={details?.imgURL}
            alt={details?.title}
            className="object-contain w-5/6 md:w-3/6"
          />
        </div>
        <div className="flex flex-col mt-2 gap-3">
          <p className="text-textColor dark:text-darkHeadingColor font-semibold text-lg md:text-2xl ">
            {details?.title}
          </p>
          <p className="text-base md:text-lg text-gray-500">
            {" "}
            {details?.calories} Calory
          </p>
          <div className="flex items-center gap-8">
            <p className="text-lg md:text-3xl text-headingColor dark:text-darkHeadingColor font-semibold">
              <span className="to-red-500">${details?.price}</span>
            </p>
          </div>
          <RatingReviews comments={comments} size={"w-6 h6"} />
          <motion.div
            whileTap={{ scale: 0.75 }}
            className="md:w-14 md:h-14 w-12 aspect-square rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md "
            onClick={() =>
              setDishFood((prev) => {
                let exist = prev?.find((food) => food.id == details.id);
                if (!exist) {
                  return [...foodCart, details];
                } else {
                  exist.qty = exist.qty + 1;
                  return [...foodCart];
                }
              })
            }
          >
            <FaShoppingCart className="text-white text-[1.4rem]" />
          </motion.div>
        </div>
      </div>
      <Suspense fallback={<Loader />}>
        <Comments
          dishFood={details}
          comments={comments}
          setComments={setComments}
        />
      </Suspense>

      <div className="w-full">
        <h2 className="text-2xl font-semibold capitalize relative text-headingColor dark:text-darkHeadingColor  before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100">
          you may also like
        </h2>
        <Suspense fallback={<Loader />}>
          <FoodRows
            flag={false}
            data={foodItems?.filter((n) => n.category == details.category)}
            splide={false}
          />
        </Suspense>
      </div>
    </section>
  );
}

export default FoodDetails;
