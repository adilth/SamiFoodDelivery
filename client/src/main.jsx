import React from "react";
// import ReactDOM from "react-dom/client";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { initialState } from "./context/initialState";
import { reducer } from "./context/reducer";
import StateProvider from "./context/StateProvider";
import "./index.css";
import { AlertStateProvider } from "./context/alertProvider";
import DataProvider from "./context/DataProvider";
import { DataInitialState } from "./context/dataInitialState";
import { DataReducer } from "./context/dataReducer";
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <Router>
      <StateProvider initialState={initialState} reducer={reducer}>
        <DataProvider initialState={DataInitialState} reducer={DataReducer}>
          <AlertStateProvider>
            <App />
          </AlertStateProvider>
        </DataProvider>
      </StateProvider>
    </Router>
  </React.StrictMode>
);
