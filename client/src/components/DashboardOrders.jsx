import { useEffect, useState } from "react";
import OrderData from "./OrderData";
import { useStateValue } from "../context/stateProvider";
import { actionTypes } from "../context/reducer";
import FilterOrders from "./FilterOrders";

const DashboardOrder = () => {
  const [{ orders }, dispatch] = useStateValue();
  const [input, setInput] = useState("");
  const [userOrders, setUserOrders] = useState(orders);
  useEffect(() => {
    if (!orders) {
      dispatch({
        type: actionTypes.GET_ALL_ORDERS,
        orders: userOrders,
      });
    }
  }, []);
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
      />
      {userOrders ? (
        <>
          {userOrders.map((item, i) => (
            <OrderData key={i} index={i} data={item} admin={true} />
          ))}
        </>
      ) : (
        <>
          <h1 className="text-[72px] text-headingColor font-bold">No Data</h1>
        </>
      )}
    </div>
  );
};

export default DashboardOrder;
