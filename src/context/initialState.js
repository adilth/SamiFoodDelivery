import { fetchItemsCart, fetchUser } from "../utils/fetchStorage";
import { fetchAllFood, getAllUsers } from "../utils/firebaseFunc";

const userInfo = fetchUser();
const cartInfo = fetchItemsCart();
const data = await fetchAllFood();
const users = await getAllUsers();
export const initialState = {
  user: userInfo,
  foodItems: null || data,
  cartShow: false,
  foodCart: cartInfo || [],
  users: users,
};
