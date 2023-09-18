import { Link } from "react-router-dom";
import { Line, ResponsiveContainer, LineChart, Tooltip } from "recharts";

function LineCharts(props) {
  return (
    <div className="flex h-full">
      <div className="flex flex-col flex-1 justify-between">
        <div className="flex items-center gap-1">
          <img src={props.icon} alt="icons" />
          <span className="text-sm font-bold">{props.title}</span>
        </div>
        <h2 className="text-2xl">{props.number}</h2>
        <Link to={props.link} style={{ color: props.color }}>
          View all
        </Link>
      </div>
      <div className=" flex-[2] flex flex-col justify-between">
        <div className="w-full h-full">
          <ResponsiveContainer width="99%" height="100%">
            <LineChart data={props.chartData}>
              <Tooltip
                contentStyle={{ background: "transparent", border: "none" }}
                labelStyle={{ display: "none" }}
                position={{ x: 10, y: 50 }}
              />
              <Line
                type="monotone"
                dataKey={props.dataKey}
                stroke={props.color}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-col text-right">
          <div
            className=" font-bold text-xl"
            style={{ color: props.percentage < 0 ? "tomato" : "green" }}
          >
            {props.percentage}%
          </div>
          <div className=" text-sm">this month</div>
        </div>
      </div>
    </div>
  );
}

export default LineCharts;
