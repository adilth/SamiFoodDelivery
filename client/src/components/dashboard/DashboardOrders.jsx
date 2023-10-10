import { useEffect, useState } from "react";
import OrderData from "../OrderData";
import FilterOrders from "../FilterOrders";
import { useDataValue } from "../../context/DataProvider";
import { DataActionTypes } from "../../context/dataReducer";

const DashboardOrder = () => {
  const [{ orders }, dispatch] = useDataValue();
  const [input, setInput] = useState("");
  const [userOrders, setUserOrders] = useState(orders);
  useEffect(() => {
    if (!orders) {
      dispatch({
        type: DataActionTypes.GET_ALL_ORDERS,
        orders: userOrders,
      });
    }
  }, [orders, dispatch, userOrders]);
  useEffect(() => {
    // Filter orders based on input value
    if (orders) {
      const filteredOrders = orders.filter((order) => {
        if (order?.items) {
          return order.items.some((item) => {
            const itemName = item?.name?.toLowerCase() || "";
            const itemCategory = item?.category?.toLowerCase() || "";
            const inputLower = input?.toLowerCase() || "";

            return (
              itemName.includes(inputLower) || itemCategory.includes(inputLower)
            );
          });
        }
        return false; // Return false if items are not defined
      });

      setUserOrders(filteredOrders);
    }
  }, [input, orders]);
  return (
    <div className=" flex items-center justify-center flex-col pt-6 w-full gap-4">
      <FilterOrders
        setInput={setInput}
        setUserOrders={setUserOrders}
        orders={orders}
        input={input}
      />
      {userOrders ? (
        <>
          {userOrders.map((item, i) => (
            <OrderData key={item.orderId} index={i} data={item} admin />
          ))}
        </>
      ) : (
        <>
          <h1 className="text-[72px] text-headingColor dark:text-darkHeadingColor font-bold">
            No Data
          </h1>
        </>
      )}
    </div>
  );
};

export default DashboardOrder;
