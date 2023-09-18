import React, { useEffect, useState } from "react";
import OrderData from "./OrderData";
import { useStateValue } from "../context/stateProvider";
import { actionTypes } from "../context/reducer";

const DashboardOrder = () => {
  const [{ orders }, dispatch] = useStateValue();
  useEffect(() => {
    if (!orders) {
      dispatch({
        type: actionTypes.GET_ALL_ORDERS,
        orders: orders,
      });
    }
  }, []);
  return (
    <div className=" flex items-center justify-center flex-col pt-6 w-full gap-4">
      {orders ? (
        <>
          {orders.map((item, i) => (
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
