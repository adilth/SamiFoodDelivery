export const fetchUser = () => {
  const userInfo =
    localStorage.getItem("user") !== undefined
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();
  return userInfo;
};
export const fetchItemsCart = () => {
  const cartInfo =
    localStorage.getItem("food") !== undefined
      ? JSON.parse(localStorage.getItem("food"))
      : localStorage.clear();
  return cartInfo ? cartInfo : [];
};
