import { DashboardLeftSection, DashboardRightSection } from "../components";

function Dashboard() {
  return (
    <div className=" h-screen flex items-center bg-primary">
      <DashboardLeftSection />
      <DashboardRightSection />
    </div>
  );
}

export default Dashboard;
