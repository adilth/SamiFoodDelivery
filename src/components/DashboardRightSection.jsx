import { Route, Routes, useLocation } from "react-router-dom";
import DashboardOrders from "./DashboardOrders";
import DashboardItems from "./DashboardItems";
import DashboardUsers from "./DashboardUsers";
import DashboardHeader from "./Dashboardheader";
import DashboardHome from "./DashboardHome";
import CreateContainer from "./CreateContainer";
function DashboardRightSection() {
  const location = useLocation();
  return (
    <div className="flex flex-col pt-6 px-8 flex-1 h-full">
      <DashboardHeader />
      <div className="flex flex-col flex-1 pb-9 overflow-y-scroll scrollbar-none ">
        <Routes location={location} key={location.pathname}>
          <Route path="/home" element={<DashboardHome />} />
          <Route path="/orders" element={<DashboardOrders />} />
          <Route path="/items" element={<DashboardItems />} />
          <Route path="/newItem" element={<CreateContainer />} />
          <Route path="/users" element={<DashboardUsers />} />
        </Routes>
      </div>
    </div>
  );
}

export default DashboardRightSection;
