// const alertReducer = (state = null, action) => {
//   switch (action.type) {
//     case "SET_SUCCESS":
//       return action.alert;

//     case "SET_WARNING":
//       return action.alert;

//     case "SET_DANGER":
//       return action.alert;

//     case "SET_INFO":
//       return action.alert;

//     case "SET_ALERT_NULL":
//       return action.alert;

//     default:
//       return state;
//   }
// };

// export default alertReducer;
export const alertActionTypes = {
  SET_SUCCESS: "success",
  SET_WARNING: "warning",
  SET_DANGER: "danger",
  SET_INFO: "info",
  SET_ALERT_NULL: "set_alert_null",
};

export const alertReducer = (state, action) => {
  switch (action.type) {
    case alertActionTypes.SET_SUCCESS:
    case alertActionTypes.SET_WARNING:
    case alertActionTypes.SET_DANGER:
    case alertActionTypes.SET_INFO:
    case alertActionTypes.SET_ALERT_NULL:
      return {
        type: action.type,
        message: action.message,
      };

    default:
      return state;
  }
};
