import { useCallback } from "react";
import { actionTypes } from "../context/reducer";
import { useStateValue } from "../context/stateProvider";
import { fetchAllFood } from "./firebaseFunc";
function getAllFoodData() {
  const [, dispatch] = useStateValue();
  return async () => {
    const data = await fetchAllFood();
    dispatch({
      type: actionTypes.SET_FOOD,
      foodItems: data,
    });
  };
}

export function useShowCard() {
  const [{ cartShow }, dispatch] = useStateValue();
  const showMenuCart = useCallback(() => {
    dispatch({
      type: actionTypes.SET_SHOW_CART,
      cartShow: !cartShow,
    });
  }, [cartShow, dispatch]);
  return showMenuCart;
}

export default getAllFoodData;
