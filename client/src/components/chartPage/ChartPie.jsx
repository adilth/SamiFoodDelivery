import { PieChart, ResponsiveContainer, Tooltip, Pie, Cell } from "recharts";
import { useGroupByCategory } from "../../hooks/dataHooks";

function ChartPie() {
  const data = useGroupByCategory();
  return (
    <div className="h-full flex flex-col justify-between">
      <h2 className="text-xl font-bold">Leads by Source</h2>
      <div className="flex items-center justify-center w-full h-full">
        <ResponsiveContainer width="99%" height={300}>
          <PieChart>
            <Tooltip
              contentStyle={{ background: "white", borderRadius: "5px" }}
            />
            <Pie
              data={data}
              innerRadius={"70%"}
              outerRadius={"90%"}
              paddingAngle={5}
              dataKey="value"
            >
              {data?.map((item) => (
                <Cell key={item.name} fill={item.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-auto flex-wrap gap-[10px] text-sm">
        {data.map((item) => (
          <div className="flex flex-col items-center" key={item.name}>
            <div className="flex items-center gap-1">
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: item.color }}
              />
              <span>{item.name}</span>
            </div>
            <span>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChartPie;
