import { useCallback, useEffect, useRef } from "react";
import { Splide, SplideTrack, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { useStateValue } from "../context/StateProvider";
import { actionTypes } from "../context/reducer";
import NotFoundImg from "./NotFoundImg";
import { foodRowsSides } from "../animations/splides";
import { activeProduct } from "../utils/firebaseFunc";
import FoodItem from "./FoodItem";
import { useFoodValue } from "../context/FoodProvider";

function FoodRows({ flag, data, splide }) {
  const rowFood = useRef();
  const [{ user }] = useStateValue();
  const [{ foodCart }, dispatch] = useFoodValue();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("food"));
    if (savedCart) {
      dispatch({
        type: actionTypes.SET_FOOD_CART,
        foodCart: savedCart,
      });
    }
  }, [dispatch]);
  console.log("here");
  const handleAddToCart = useCallback(
    async (item) => {
      const updateCartAndLocalStorage = (newCart) => {
        dispatch({
          type: actionTypes.SET_FOOD_CART,
          foodCart: newCart,
        });
        localStorage.setItem("food", JSON.stringify(newCart));
      };
      // Check if the item is already in the cart
      const exist = foodCart.find((el) => el.id === item.id);
      let updatedCart;
      if (exist) {
        // If the item exists in the cart, update its quantity
        exist.qty += 1;
        updatedCart = [...foodCart];
      } else {
        // If the item is not in the cart, add it with a quantity of 1
        item.qty = 1;
        updatedCart = [...foodCart, item];
      }
      updateCartAndLocalStorage(updatedCart);

      if (user && !exist) {
        await activeProduct({
          id: Date.now(),
          text: `${user?.displayName} add ${item?.title} to cart`,
          userName: user?.displayName,
          productName: item?.title,
          item: item,
          time: new Date(),
        });
      }
    },
    [foodCart, user, dispatch]
  );

  let focusStart = `${data?.length > 2 ? "center" : "start"}`;
  const updatedFoodRowsSides = {
    options: {
      ...foodRowsSides.options,
      focus: focusStart,
    },
  };
  if (splide) {
    return (
      <Splide
        ref={rowFood}
        {...updatedFoodRowsSides}
        hasTrack={false}
        aria-label="product food that can delivered"
        className={`food_item w-full my-12 flex items-center justify-start scroll-smooth ${
          flag
            ? "overflow-x-scroll scrollbar-none"
            : "overflow-x-hidden flex-wrap"
        }`}
      >
        <SplideTrack>
          {data && data?.length > 0 ? (
            data.map((item) => (
              <SplideSlide key={item.id}>
                <FoodItem item={item} handleAddToCart={handleAddToCart} />
              </SplideSlide>
            ))
          ) : (
            <NotFoundImg />
          )}
        </SplideTrack>
      </Splide>
    );
  } else {
    return (
      <div
        ref={rowFood}
        className={`w-full my-12 grid ${
          data?.length > 2
            ? "grid-cols-menu_auto_fit"
            : "grid-cols-menu_auto_fit_min"
        } gap-x-4 md:gap-x-6 gap-y-8 px-4 md:px-12`}
      >
        {data && data.length > 0 ? (
          data.map((item) => (
            <FoodItem
              key={item.id}
              item={item}
              handleAddToCart={handleAddToCart}
            />
          ))
        ) : (
          <NotFoundImg />
        )}
      </div>
    );
  }
}

export default FoodRows;
