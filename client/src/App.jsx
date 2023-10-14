import { Suspense, lazy } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Loader, PageNotFound } from "./components";
import { AnimatePresence } from "framer-motion";
// import getAllFoodData from "./utils/getAllData";
import { useStateValue } from "./context/StateProvider";
import { useAlertState } from "./context/alertProvider";

const Alert = lazy(() => import("./components/Alert"));
const HomeRoute = lazy(() => import("./pages/HomeRoute"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Success = lazy(() => import("./pages/Success"));

function App() {
  const location = useLocation();
  const [{ user }] = useStateValue();
  const { alertState } = useAlertState();
  // const fetchData = getAllFoodData();
  // useMemo(() => {
  //   fetchData();
  // }, []);
  return (
    <AnimatePresence mode="wait">
      <div className="w-full h-auto flex flex-col bg-primary dark:bg-darkPrimary dark:text-darkHeadingColor">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/*"
            exact
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
                {user && user.email === "rajaadil19952019@gmail.com" ? (
                  <Dashboard />
                ) : (
                  <Navigate to="/" replace />
                )}
              </Suspense>
            }
          />
          <Route path="/checkout-success" element={<Success />} />
          <Route path="/404" element={<PageNotFound />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
        {alertState?.type && (
          <Suspense>
            <Alert type={alertState?.type} message={alertState?.message} />
          </Suspense>
        )}
      </div>
    </AnimatePresence>
  );
}

export default App;
