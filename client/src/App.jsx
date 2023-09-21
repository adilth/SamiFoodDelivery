import { Suspense, lazy, useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Alert, Loader, PageNotFound } from "./components";
import { AnimatePresence } from "framer-motion";
import getAllFoodData from "./utils/getAllData";
import { useStateValue } from "./context/stateProvider";
import { useAlertState } from "./context/alertProvider";
const UserInfo = lazy(() => import("./pages/UserInfo"));
const UsersOrder = lazy(() => import("./pages/UserOrder"));
const HomeRoute = lazy(() => import("./pages/HomeRoute"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Success = lazy(() => import("./pages/Success"));
const ProductInfo = lazy(() => import("./pages/ProductInfo"));

function App() {
  const location = useLocation();
  const [{ foodItem, user }, dispatch] = useStateValue();
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
              user && user.email === "rajaadil19952019@gmail.com" ? (
                <Suspense fallback={<Loader />}>
                  <Dashboard />
                </Suspense>
              ) : (
                <Navigate to="/" replace />
              )
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
          <Route
            path="/userOrder"
            element={
              user ? (
                <Suspense fallback={<Loader />}>
                  <UsersOrder />
                </Suspense>
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/product"
            element={
              user ? (
                <Suspense fallback={<Loader />}>
                  <ProductInfo />
                </Suspense>
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/user"
            element={
              user ? (
                <Suspense fallback={<Loader />}>
                  <UserInfo />
                </Suspense>
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route path="/404" element={<PageNotFound />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
        {alertState?.type && (
          <Alert type={alertState?.type} message={alertState?.message} />
        )}
      </div>
    </AnimatePresence>
  );
}

export default App;
