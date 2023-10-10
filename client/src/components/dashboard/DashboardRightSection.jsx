import { Route, Routes, useLocation } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import { Suspense, lazy } from "react";
import Loader from "../Loader";
const DashboardHome = lazy(() => import("./DashboardHome"));
const DashboardUsers = lazy(() => import("./DashboardUsers"));
const CreateContainer = lazy(() => import("./CreateContainer"));
const UserInfo = lazy(() => import("./UserInfo"));
const DashboardItems = lazy(() => import("./DashboardItems"));
const DashboardOrders = lazy(() => import("./DashboardOrders"));
const ProductInfo = lazy(() => import("./ProductInfo"));
function DashboardRightSection() {
  const location = useLocation();
  return (
    <div className="flex flex-col pt-4 md:pt-6 px-4 sm:px-5 md:px-8 flex-1 h-full z-0 dark:bg-darkPrimary dark:text-darkTextColor w-full">
      <DashboardHeader />
      <div className="flex flex-col flex-1 pb-9  overflow-y-scroll scrollbar-none w-full">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/home"
            element={
              <Suspense fallback={<Loader />}>
                <DashboardHome />
              </Suspense>
            }
          />
          <Route
            path="/orders"
            element={
              <Suspense fallback={<Loader />}>
                <DashboardOrders />
              </Suspense>
            }
          />
          <Route
            path="/items"
            element={
              <Suspense fallback={<Loader />}>
                <DashboardItems />
              </Suspense>
            }
          />
          <Route
            path="/newItem"
            element={
              <Suspense fallback={<Loader />}>
                <CreateContainer />
              </Suspense>
            }
          />
          <Route
            path="/users"
            element={
              <Suspense fallback={<Loader />}>
                <DashboardUsers />
              </Suspense>
            }
          />
          <Route
            path="/product/:productId"
            element={
              <Suspense fallback={<Loader />}>
                <ProductInfo />
              </Suspense>
            }
          />
          <Route
            path="/users/:userId"
            element={
              <Suspense fallback={<Loader />}>
                <UserInfo />
              </Suspense>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default DashboardRightSection;
