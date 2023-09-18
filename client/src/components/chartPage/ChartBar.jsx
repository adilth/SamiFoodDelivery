import { Bar, BarChart, ResponsiveContainer, Tooltip } from "recharts";

function ChartBar(props) {
  return (
    <div className="w-full h-full">
      <h2 className="text-xl mb-5 font-bold">{props.title}</h2>
      <div className="h-full">
        <ResponsiveContainer width="99%" height={150}>
          <BarChart data={props.chartData}>
            <Tooltip
              contentStyle={{ background: "#2a3447", borderRadius: "5px" }}
              labelStyle={{ display: "none" }}
              cursor={{ fill: "none" }}
            />
            <Bar dataKey={props.dataKey} fill={props.color} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ChartBar;
