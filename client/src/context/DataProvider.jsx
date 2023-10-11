import { createContext, useContext, useReducer } from "react";

export const DataContext = createContext();

const DataProvider = ({ reducer, initialState, children }) => (
  <DataContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </DataContext.Provider>
);

export const useDataValue = () => useContext(DataContext);

export default DataProvider;
