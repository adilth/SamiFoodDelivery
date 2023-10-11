export const actionTypes = {
  SET_USER: "set_user",
  SET_FOOD: "set_food",
  SET_SHOW_CART: "set_showing_cart",
  SET_FOOD_CART: "set_food_cart",
};

export const reducer = (state, action) => {
  // console.log(action);
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case actionTypes.SET_FOOD:
      return {
        ...state,
        foodItems: action.foodItems,
      };
    case actionTypes.SET_SHOW_CART:
      return {
        ...state,
        cartShow: action.cartShow,
      };
    case actionTypes.SET_FOOD_CART:
      return {
        ...state,
        foodCart: action.foodCart,
      };
    default:
      return state;
  }
};
