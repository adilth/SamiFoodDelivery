export const DataActionTypes = {
  GET_ALL_USERS: "get_all_users",
  GET_ALL_ORDERS: "get_all_orders",
  GET_ALL_ACTIVITY: "get_all_activity",
};

export const DataReducer = (state, action) => {
  // console.log(action);
  switch (action.type) {
    case DataActionTypes.GET_ALL_USERS:
      return {
        ...state,
        users: action.users,
      };
    case DataActionTypes.GET_ALL_ORDERS:
      return {
        ...state,
        orders: action.orders,
      };
    case DataActionTypes.GET_ALL_ACTIVITY:
      return {
        ...state,
        orders: action.activity,
      };
    default:
      return state;
  }
};
