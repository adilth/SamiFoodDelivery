import { Suspense, lazy } from "react";
import {
  chartUsers,
  chartConversion,
  chartProduct,
  chartRevenue,
  barChartRevenue,
  barChartVisit,
} from "../../utils/data";
import { LineCharts } from "../chartPage";
import Loader from "../Loader";
const TopBox = lazy(() => import("../chartPage/TopBox"));
const ChartPie = lazy(() => import("../chartPage/ChartPie"));
const ChartArea = lazy(() => import("../chartPage/ChartArea"));
const ChartBar = lazy(() => import("../chartPage/ChartBar"));
function DashboardHome() {
  return (
    <div className="grid xl:gap-5 lg:gap-4 gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-[minmax(160px,auto)] grid-flow-dense mt-7">
      <div className="p-[14px] rounded-xl border-2 border-slate-400 dark:border-slate-800 col-span-1 row-span-3">
        <Suspense fallback={<Loader />}>
          <TopBox />
        </Suspense>
      </div>
      <div className="p-[14px] rounded-xl border-2 border-slate-400 dark:border-slate-800 col-span-1">
        <LineCharts {...chartUsers} />
      </div>
      <div className="p-[14px] rounded-xl border-2 border-slate-400 dark:border-slate-800 col-span-1">
        <LineCharts {...chartRevenue} />
      </div>
      <div className="p-[14px] rounded-xl border-2 border-slate-400 dark:border-slate-800  col-span-1 row-span-3">
        <Suspense fallback={<Loader />}>
          <ChartPie />
        </Suspense>
      </div>
      <div className="p-[14px] rounded-xl border-2 border-slate-400 dark:border-slate-800 col-span-1">
        <LineCharts {...chartProduct} />
      </div>
      <div className="p-[14px] rounded-xl border-2 border-slate-400 dark:border-slate-800 col-span-1">
        <LineCharts {...chartConversion} />
      </div>
      <div className="p-[14px] rounded-xl border-2 border-slate-400 dark:border-slate-800 col-span-1 md:col-span-2 row-span-2">
        <Suspense fallback={<Loader />}>
          <ChartArea />
        </Suspense>
      </div>
      <div className="p-[14px] rounded-xl border-2 border-slate-400 dark:border-slate-800 col-span-1">
        <Suspense fallback={<Loader />}>
          <ChartBar {...barChartRevenue} />
        </Suspense>
      </div>
      <div className="p-[14px] rounded-xl border-2 border-slate-400 dark:border-slate-800 col-span-1">
        <Suspense fallback={<Loader />}>
          <ChartBar {...barChartVisit} />
        </Suspense>
      </div>
    </div>
  );
}

export default DashboardHome;
