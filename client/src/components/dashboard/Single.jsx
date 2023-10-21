import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { motion } from "framer-motion";
import { useState } from "react";
import ModalUpdateItem from "./ModalUpdateItem";
import { buttonTapSoft } from "../../animations/motion";
function Single(props) {
  const [editItem, setEditItem] = useState(null);
  const [open, setOpen] = useState(false);
  const DAY_MILLISECONDS = 1000 * 60 * 60 * 24;
  function getRelativeTime(timestamp) {
    const rtf = new Intl.RelativeTimeFormat("en", {
      numeric: "auto",
    });
    const daysDifference = Math.round(
      (timestamp - new Date().getTime()) / DAY_MILLISECONDS
    );

    return rtf.format(daysDifference, "day");
  }
  return (
    <div
      className="flex flex-col md:flex-row gap-3 mt-6 flex-wrap"
      key={props.id}
    >
      <div className=" flex-1">
        <div className="info">
          <div className="flex w-full gap-4">
            {props.img && (
              <img
                className="w-[16rem]  rounded-2xl object-cover"
                src={props.img}
                alt={`product ${props.name} image`}
              />
            )}
            <div className="ml-4 h-full">
              <h2 className=" font-semibold mb-4">{props.name}</h2>
              {props?.info?.productId && (
                <motion.button
                  {...buttonTapSoft}
                  className="bg-gradient-to-br font-bold from-orange-400 to-orange-500 px-5 py-2 rounded-lg hover:shadow-lg  text-white"
                  onClick={() => {
                    setEditItem(props.item);
                    setOpen(true);
                  }}
                >
                  Update
                </motion.button>
              )}
            </div>
          </div>
          <div className=" text-lg">
            {Object.entries(props.info).map((item) => (
              <div className="my-7" key={item[0]}>
                <span className="font-bold mr-3 capitalize">{item[0]}</span>
                <span className="">{item[1]}</span>
              </div>
            ))}
          </div>
        </div>
        <hr className=" w-11/12 h-0 border-[0.5px] border-slate-700 dark:border-state-300 my-5" />
        {props.chart && (
          <div className="mt-12 w-4/5 h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={props.chart.data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                {props.chart.dataKeys.map((dataKey) => (
                  <Line
                    type="monotone"
                    key={dataKey.productId}
                    dataKey={dataKey.name}
                    stroke={dataKey.color}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
      <div className="flex-1">
        <h2 className="mb-4 text-lg font-semibold">Latest Activities</h2>
        {props.activities ? (
          <ul className="">
            {props.activities.map((activity) => (
              <li
                key={activity.id}
                className=" list-none relative w-[2px] pt-12 bg-[#f45b69] after:absolute after:content-[''] after:w-3 after:h-3 after:bg-[#f45b69] after:rounded-full after:-translate-x-1/2 after:left-1/2 after:bottom-0"
              >
                <div className="md:min-w-[480px] min-w-[250px] p-4 bg-[#f45b682e] ml-4">
                  <p className="mt-1">{activity.text}</p>
                  <time className=" text-sm text-stone-400">
                    {getRelativeTime(
                      new Date(
                        activity.time.toDate().toLocaleDateString("en-US")
                      ).getTime()
                    )}
                  </time>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-xl"> No activity was made</div>
        )}
      </div>
      {open && (
        <ModalUpdateItem
          slug="product"
          setOpen={setOpen}
          item={editItem}
          open={open}
        />
      )}
    </div>
  );
}

export default Single;
