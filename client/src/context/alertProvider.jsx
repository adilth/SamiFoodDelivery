// AlertStateProvider.js
import { createContext, useContext, useReducer } from "react";
import { alertReducer } from "./alertReducer";

const AlertContext = createContext();

export const AlertStateProvider = ({ children }) => {
  const [alertState, dispatch] = useReducer(alertReducer, null);

  const setAlert = (type, message) => {
    dispatch({ type, message });
  };

  return (
    <AlertContext.Provider value={{ alertState, setAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlertState = () => useContext(AlertContext);
