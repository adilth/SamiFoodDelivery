import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStateValue } from "../context/stateProvider";
import { motion } from "framer-motion";
import { FaShoppingCart } from "react-icons/fa";
import NotFound from "../assets/img/NotFound.svg";
import { Link } from "react-router-dom";
import { actionTypes } from "../context/reducer";
import { Comments, FoodRows, Loader } from "../components";

function FoodDetails() {
  const { nameId } = useParams();
  console.log(nameId);
  const [{ foodItems, foodCart }, dispatch] = useStateValue();
  const [dishFood, setDishFood] = useState(foodCart);
  const [details, setDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const addToCart = () => {
    dispatch({
      type: actionTypes.SET_FOOD_CART,
      foodCart: dishFood,
    });
    localStorage.setItem("food", JSON.stringify(dishFood));
  };
  const getFoodDetails = () => {
    const detailsFood = foodItems.find((item) => item.id == nameId);

    setDetails(detailsFood);
    setIsLoading(false);
  };
  useEffect(() => {
    getFoodDetails();
  }, [nameId]);

  useEffect(() => {
    addToCart();
  }, [dishFood]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [dishFood]);

  return (
    <section id="food-Details" className="p-4 flex flex-col justify-center ">
      <div className="grid grid-cols-2 gap-8 mb-10">
        {isLoading && <Loader />}
        <div className="w-full">
          <img
            src={details?.imgURL}
            alt={details?.title}
            className="object-contain w-5/6"
          />
        </div>
        <div className="flex flex-col mt-2 gap-3">
          <p className="text-textColor font-semibold text-lg md:text-2xl ">
            {details?.title}
          </p>
          <p className="text-lg text-gray-500"> {details?.calories} Calory</p>
          <div className="flex items-center gap-8">
            <p className="text-2xl text-headingColor font-semibold">
              <span className="to-red-500">${details?.price}</span>
            </p>
          </div>
          <p className=" bg-yellow-400 w-fit"> ★★★★☆</p>
          <motion.div
            whileTap={{ scale: 0.75 }}
            className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md "
            onClick={() =>
              setDishFood((prev) => {
                let exist = prev?.find((food) => food.id == details.id);
                console.log(prev);
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
      <Comments />
      <div className="w-full">
        <h2 className="text-2xl font-semibold capitalize relative text-headingColor before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100">
          you may also like
        </h2>
        <FoodRows
          flag={false}
          data={foodItems?.filter((n) => n.category == details.category)}
          splide={false}
        />
      </div>
    </section>
  );
}

export default FoodDetails;
