import { createContext, useContext, useReducer } from "react";

export const FoodContext = createContext();

const FoodProvider = ({ reducer, initialState, children }) => (
  <FoodContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </FoodContext.Provider>
);

export const useFoodValue = () => useContext(FoodContext);

export default FoodProvider;
