export const actionTypes = {
  SET_USER: "set_user",
  SET_FOOD: "set_food",
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
    default:
      return state;
  }
};
