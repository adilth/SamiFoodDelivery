import {
  chartUsers,
  chartConversion,
  chartProduct,
  chartRevenue,
  barChartRevenue,
  barChartVisit,
} from "../utils/data";
import { TopBox, LineCharts, ChartBar, ChartPie, ChartArea } from "./chartPage";

function DashboardHome() {
  return (
    <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-[minmax(160px,auto)] mt-7">
      <div className="p-[14px] rounded-xl border-2 border-slate-400 col-span-1 row-span-3">
        <TopBox />
      </div>
      <div className="p-[14px] rounded-xl border-2 border-slate-400 ">
        <LineCharts {...chartUsers} />
      </div>
      <div className="p-[14px] rounded-xl border-2 border-slate-400 ">
        <LineCharts {...chartRevenue} />
      </div>
      <div className="p-[14px] rounded-xl border-2 border-slate-400  col-span-1 row-span-3">
        <ChartPie />
      </div>
      <div className="p-[14px] rounded-xl border-2 border-slate-400 ">
        <LineCharts {...chartProduct} />
      </div>
      <div className="p-[14px] rounded-xl border-2 border-slate-400 ">
        <LineCharts {...chartConversion} />
      </div>
      <div className="p-[14px] rounded-xl border-2 border-slate-400 col-span-2 row-span-2">
        <ChartArea />
      </div>
      <div className="p-[14px] rounded-xl border-2 border-slate-400 ">
        <ChartBar {...barChartRevenue} />
      </div>
      <div className="p-[14px] rounded-xl border-2 border-slate-400 ">
        <ChartBar {...barChartVisit} />
      </div>
    </div>
  );
}

export default DashboardHome;
