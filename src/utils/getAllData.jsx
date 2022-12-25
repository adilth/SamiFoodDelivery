import { actionTypes } from "../context/reducer";
import { useStateValue } from "../context/stateProvider";
import { fetchAllFood } from "./firebaseFunc";
function getAllFoodData() {
  const [{ foodItems }, dispatch] = useStateValue();
  return async () => {
    const data = await fetchAllFood();
    dispatch({
      type: actionTypes.SET_FOOD,
      foodItems: data,
    });
  };
}
export function showMenuCart() {
  const [{ cartShow }, dispatch] = useStateValue();
  return () => {
    dispatch({
      type: actionTypes.SET_SHOW_CART,
      cartShow: !cartShow,
    });
  };
}
export default getAllFoodData;
