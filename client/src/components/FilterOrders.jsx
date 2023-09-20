import React, { useEffect, useMemo, useState } from "react";
import DebounceSearch from "./DebounceSearch";

function FilterOrders({ input, setInput, setUserOrders, orders }) {
  const [foodFields, setFoodFields] = useState("all");
  const dataItems = useMemo(() => {}, [orders]);
  const handleSelectFields = (data) => {
    let filteredData = data; // Start with the unfiltered data
    //?TODO: remember to remove user that login that not effect the dashboard orders
    if (foodFields === "preparing") {
      filteredData = filteredData.filter((item) => item?.sts === "preparing");
    } else if (foodFields === "cancelled") {
      filteredData = filteredData.filter((item) => item?.sts === "cancelled");
    } else if (foodFields === "delivered") {
      filteredData = filteredData.filter((item) => item?.sts === "delivered");
    }
    // Return the filtered data
    return filteredData;
  };
  useEffect(() => {
    setUserOrders(handleSelectFields(orders));
  }, [foodFields, dataItems]);
  return (
    <>
      <div className="flex justify-between w-full">
        <div className="px-4 py-2 cursor-pointer text-end">
          <select
            className="w-50 px-4 py-3 rounded-sm "
            id="foodSearch"
            onChange={(e) => setFoodFields(e.target.value)}
          >
            <option value="all">All</option>
            <option value="preparing">Preparing</option>
            <option value="cancelled">Canceled</option>
            <option value="delivered">delivered</option>
          </select>
        </div>
        <div className="relative flex justify-end mr-6 h-fit">
          <DebounceSearch value={input} onChange={(value) => setInput(value)} />
        </div>
      </div>
      <div className="w-full mt-3">
        <p className="text-2xl font-semibold capitalize relative text-headingColor before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100">
          Our Menu
        </p>
      </div>
    </>
  );
}

export default FilterOrders;
