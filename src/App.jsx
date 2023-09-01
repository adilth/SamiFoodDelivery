import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import {
  Alert,
  CardShopping,
  CreateContainer,
  Footer,
  Header,
} from "./components";
import { AnimatePresence } from "framer-motion";
import getAllFoodData from "./utils/getAllData";
import { FoodDetails, Home, HomeRoute } from "./pages";
import { useStateValue } from "./context/stateProvider";
import Dashboard from "./pages/Dashboard";
import { useAlertState } from "./context/alertProvider";

function App() {
  const location = useLocation();
  const [{ cartShow, foodItem }, dispatch] = useStateValue();
  const { alertState } = useAlertState();
  const fetchData = getAllFoodData();
  useEffect(() => {
    fetchData();
  }, [foodItem]);
  // useEffect(() => {}, [cartShow]);
  return (
    <AnimatePresence mode="wait">
      <div className="w-full h-auto flex flex-col bg-primary">
        <Routes location={location} key={location.pathname}>
          <Route path="/*" element={<HomeRoute />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Routes>

        {alertState?.type && (
          <Alert type={alertState?.type} message={alertState?.message} />
        )}
      </div>
    </AnimatePresence>
  );
}

export default App;
