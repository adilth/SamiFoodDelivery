import { fetchItemsCart, fetchUser } from "../utils/fetchStorage";
import { fetchAllFood } from "../utils/firebaseFunc";

const userInfo = fetchUser();
const cartInfo = fetchItemsCart();
const data = await fetchAllFood();

export const initialState = {
  foodItems: null || data,
  foodCart: cartInfo || [],
};
export const initialStateSet = {
  user: userInfo,
  cartShow: false,
};
