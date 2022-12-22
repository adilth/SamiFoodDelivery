import { fetchUser } from "../utils/fetchStorage";

const userInfo = fetchUser();
export const initialState = {
  user: userInfo,
  foodItems: null,
};
