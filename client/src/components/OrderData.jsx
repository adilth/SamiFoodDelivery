import { motion } from "framer-motion";
import { buttonTap, staggerFadeInOut } from "../animations/motion";
import { updateCartSts } from "../utils/firebaseFunc";
import { useEffect, useState } from "react";
import { FaDollarSign } from "@react-icons/all-files/fa/FaDollarSign";

const OrderData = ({ index, data, admin }) => {
  const [updateSts, setUpdateSts] = useState(data?.sts);
  const handleClick = async (orderId, sts) => {
    await updateCartSts(orderId, sts);
    setUpdateSts(sts);
  };

  useEffect(() => {}, [updateSts]);
  return (
    <motion.div
      {...staggerFadeInOut(index)}
      className="w-full flex flex-col items-start justify-start px-3 py-2 border relative border-gray-300 dark:border-gray-700 bg-lightOverlay drop-shadow-md rounded-md gap-4"
    >
      <div className="w-full flex items-center justify-center gap-3 md:justify-between flex-wrap">
        <h1 className="text-xl text-headingColor dark:text-darkHeadingColor font-semibold ">
          Orders
        </h1>

        <div className=" flex items-center xs:justify-center gap-4 flex-wrap sm:flex-nowrap">
          <div className="flex items-center gap-1 flex-wrap text-textColor dark:text-darkTextColor">
            <p>Total : </p>
            <span className="text-headingColor dark:text-darkHeadingColor font-bold flex items-center">
              <FaDollarSign className="text-lg text-red-500" />
              {data?.total}
            </span>
          </div>

          <p className="px-2 py-[2px] text-sm text-headingColor font-semibold capitalize  rounded-md bg-emerald-400 drop-shadow-md">
            {data?.status}
          </p>

          <p
            className={`text-base font-semibold capitalize border border-gray-300 px-2 py-[2px] rounded-md ${
              (updateSts === "preparing" && "text-orange-500 bg-orange-100") ||
              (updateSts === "cancelled" && "text-red-500 bg-red-100") ||
              (updateSts === "delivered" && "text-emerald-500 bg-emerald-100")
            }`}
          >
            {updateSts}
          </p>

          {admin && (
            <div className="flex flex-wrap sm:flex-row items-center sm:justify-center md:justify-start gap-2">
              <p className="text-lg font-semibold text-headingColor dark:text-darkTextColor">
                Mark As
              </p>

              <motion.p
                {...buttonTap}
                onClick={() => handleClick(data.orderId, "preparing")}
                className={`text-orange-500 text-base font-semibold capitalize border border-gray-300 px-2 py-[2px] rounded-md cursor-pointer`}
              >
                Preparing
              </motion.p>
              <motion.p
                {...buttonTap}
                onClick={() => handleClick(data.orderId, "cancelled")}
                className={`text-red-500 text-base font-semibold capitalize border border-gray-300 px-2 py-[2px] rounded-md cursor-pointer`}
              >
                Cancelled
              </motion.p>
              <motion.p
                {...buttonTap}
                onClick={() => handleClick(data.orderId, "delivered")}
                className={`text-emerald-500 text-base font-semibold capitalize border border-gray-300 px-2 py-[2px] rounded-md cursor-pointer`}
              >
                Delivered
              </motion.p>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-start xs:flex-nowrap flex-wrap w-full">
        <div className="flex items-center justify-center gap-4 flex-wrap lg:flex-nowrap">
          {data?.items &&
            data.items.map((item, j) => (
              <motion.div
                {...staggerFadeInOut(j)}
                key={item.product}
                className="flex items-center justify-center gap-1"
              >
                <img
                  src={item.image}
                  className="w-10 h-10 object-contain"
                  alt={`imgage of ${item.name}`}
                />

                <div className="flex items-start flex-col">
                  <p className="text-base font-semibold text-headingColor dark:text-darkTextColor">
                    {item.name}
                  </p>
                  <div className="flex items-start gap-2">
                    <p className="text-sm text-textColor dark:text-darkTextColor">
                      {" "}
                      Qty : {item.quantity}
                    </p>
                    <p className="flex items-center gap-1 text-textColor dark:text-darkTextColor">
                      <FaDollarSign className="text-base text-red-500" />
                      {parseFloat(item.price).toFixed(2)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>

        <div className="flex items-start justify-start flex-col gap-2 px-6 ml-auto w-full md:w-460">
          <h1 className="text-lg text-headingColor dark:text-darkTextColor font-semibold">
            {data.shipping_details.name}
          </h1>

          <p className="text-base text-headingColor dark:text-darkTextColor -mt-2">
            {data.customer.email} {data.customer.phone}
          </p>

          <p className="text-base text-textColor dark:text-darkTextColor -mt-2">
            {data.shipping_details.address.line1},
            {data.shipping_details.address.line2}{" "}
            {data.shipping_details.address.country},
            {data.shipping_details.address.state} -
            {data.shipping_details.address.postal_code}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderData;
