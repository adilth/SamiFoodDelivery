import { fetchItemsCart, fetchUser } from "../utils/fetchStorage";
import { fetchAllFood } from "../utils/firebaseFunc";

const userInfo = fetchUser();
const cartInfo = fetchItemsCart();
const data = await fetchAllFood();
export const initialState = {
  user: userInfo,
  foodItems: null || data,
  cartShow: false,
  foodCart: cartInfo,
};
