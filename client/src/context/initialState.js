import { fetchItemsCart, fetchUser } from "../utils/fetchStorage";
import {
  fetchAllFood,
  getAllUsers,
  getAllOrders,
  getActivity,
} from "../utils/firebaseFunc";

const userInfo = fetchUser();
const cartInfo = fetchItemsCart();
const data = await fetchAllFood();
const users = await getAllUsers();
const orders = await getAllOrders();
const activity = await getActivity();

export const initialState = {
  user: userInfo,
  foodItems: null || data,
  cartShow: false,
  foodCart: cartInfo || [],
  users: users,
  orders: orders,
  activity: activity,
};
