import { getAllUsers, getAllOrders, getActivity } from "../utils/firebaseFunc";

const users = await getAllUsers();
const orders = await getAllOrders();
const activity = await getActivity();

export const DataInitialState = {
  users: users,
  orders: orders || [],
  activity: activity,
};
