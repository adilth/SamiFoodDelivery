import { useCallback } from "react";
import { actionTypes, actionTypesSet } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import { fetchAllFood } from "./firebaseFunc";
import { useFoodValue } from "../context/FoodProvider";
function useGetAllFoodData() {
  const [, dispatch] = useFoodValue();
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
      type: actionTypesSet.SET_SHOW_CART,
      cartShow: !cartShow,
    });
  }, [cartShow, dispatch]);
  return showMenuCart;
}

export default useGetAllFoodData;
