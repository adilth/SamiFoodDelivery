import { Route, Routes, useLocation } from "react-router-dom";
import DashboardOrders from "./DashboardOrders";
import DashboardItems from "./DashboardItems";
import DashboardUsers from "./DashboardUsers";
import DashboardHeader from "./Dashboardheader";
import DashboardHome from "./DashboardHome";
import CreateContainer from "./CreateContainer";
import { Suspense, lazy } from "react";
import Loader from "./Loader";
const UserInfo = lazy(() => import("./dashboard/UserInfo"));
const ProductInfo = lazy(() => import("./dashboard/ProductInfo"));
function DashboardRightSection() {
  const location = useLocation();
  return (
    <div className="flex flex-col pt-4 md:pt-6 px-5 md:px-8 flex-1 h-full z-0">
      <DashboardHeader />
      <div className="flex flex-col flex-1 pb-9 overflow-y-scroll scrollbar-none ">
        <Routes location={location} key={location.pathname}>
          <Route path="/home" element={<DashboardHome />} />
          <Route path="/orders" element={<DashboardOrders />} />
          <Route path="/items" element={<DashboardItems />} />
          <Route path="/newItem" element={<CreateContainer />} />
          <Route path="/users" element={<DashboardUsers />} />
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
