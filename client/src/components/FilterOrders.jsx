import React, { useEffect, useState } from "react";
import DebounceSearch from "./DebounceSearch";
import { useStateValue } from "../context/stateProvider";

function FilterOrders({ input, setInput, orders }) {
  const [foodFields, setFoodFields] = useState("preparing");
  const handleSelectFields = (data) => {
    if (foodFields == "preparing") {
      return data.filter((item) => item.sts === "preparing");
    } else if (foodFields == "cancelled") {
      return data.filter((item) => item.sts === "cancelled");
    } else if (foodFields == "delivered") {
      return data.filter((item) => item.sts === "delivered");
    } else {
      return data;
    }
  };

  useEffect(() => {
    handleSelectFields(orders);
  }, [foodFields]);
  return (
    <>
      <div className="flex justify-between w-full">
        <div className="px-4 py-3 cursor-pointer text-end">
          <select
            className="w-50 px-4 py-3 rounded-sm "
            id="foodSearch"
            onChange={(e) => setFoodFields(e.target.value)}
          >
            <option value="all">All</option>
            <option value="preparing">Preparing</option>
            <option value="canceled">Canceled</option>
            <option value="complete">delivered</option>
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
