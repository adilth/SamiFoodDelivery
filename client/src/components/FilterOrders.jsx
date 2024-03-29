import { useCallback, useEffect, useState } from "react";
import DebounceSearch from "./DebounceSearch";

function FilterOrders({ input, setInput, setUserOrders, orders }) {
  const [foodFields, setFoodFields] = useState("all");
  const handleSelectFields = useCallback(
    (data) => {
      let filteredData = data; // Start with the unfiltered data
      //?TODO: remember to know how to change some behaver not get the right sts and some thing missing here
      if (foodFields === "preparing") {
        filteredData = filteredData.filter((item) => item?.sts === "preparing");
      } else if (foodFields === "cancelled") {
        filteredData = filteredData.filter((item) => item?.sts === "cancelled");
      } else if (foodFields === "delivered") {
        filteredData = filteredData.filter((item) => item?.sts === "delivered");
      }
      // Return the filtered data
      return filteredData;
    },
    [foodFields]
  );

  useEffect(() => {
    setUserOrders(handleSelectFields(orders));
  }, [handleSelectFields, setUserOrders]);
  return (
    <>
      <div className="flex justify-between items-center flex-wrap w-full">
        <div className="px-4 py-2 cursor-pointer text-end">
          <select
            className="w-50 px-4 py-3 rounded-sm dark:bg-darkCardBody"
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
          <DebounceSearch input={input} onChange={(value) => setInput(value)} />
        </div>
      </div>
      <div className="w-full my-3">
        <p className="text-2xl font-semibold capitalize relative text-headingColor dark:text-darkHeadingColor before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100">
          Orders
        </p>
      </div>
    </>
  );
}

export default FilterOrders;
