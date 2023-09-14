import { Suspense, lazy, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Alert, Loader } from "./components";
import { AnimatePresence } from "framer-motion";
import getAllFoodData from "./utils/getAllData";
import { useStateValue } from "./context/stateProvider";
import { useAlertState } from "./context/alertProvider";
const HomeRoute = lazy(() => import("./pages/HomeRoute"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Success = lazy(() => import("./pages/Success"));

function App() {
  const location = useLocation();
  const [{ foodItem }, dispatch] = useStateValue();
  const { alertState } = useAlertState();
  const fetchData = getAllFoodData();
  useEffect(() => {
    fetchData();
  }, [foodItem]);
  return (
    <AnimatePresence mode="wait">
      <div className="w-full h-auto flex flex-col bg-primary">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/*"
            element={
              <Suspense fallback={<Loader />}>
                <HomeRoute />
              </Suspense>
            }
          />
          <Route
            path="/dashboard/*"
            element={
              <Suspense fallback={<Loader />}>
                <Dashboard />
              </Suspense>
            }
          />
          <Route
            path="/checkout-success"
            element={
              <Suspense fallback={<Loader />}>
                <Success />
              </Suspense>
            }
          />
        </Routes>
        {alertState?.type && (
          <Alert type={alertState?.type} message={alertState?.message} />
        )}
      </div>
    </AnimatePresence>
  );
}

export default App;
