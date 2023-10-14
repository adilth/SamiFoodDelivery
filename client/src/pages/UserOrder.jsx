import { useEffect, useState } from "react";
import { FilterOrders, OrderData } from "../components";
import { useStateValue } from "../context/StateProvider";
import { useDataValue } from "../context/DataProvider";

const UsersOrder = () => {
  const [{ user }] = useStateValue();
  const [{ orders }] = useDataValue();
  const [input, setInput] = useState("");
  const [userOrders, setUserOrders] = useState(null);
  let orderFilters = orders?.filter((item) => item.userId === user.uid);
  console.log(orders);
  useEffect(() => {
    if (orders) {
      const filteredOrders = orders?.filter((order) => {
        // Check if the order belongs to the current user
        if (order?.userId !== user?.uid) {
          return false;
        }
        // Check the search criteria within the order's items
        if (order?.items) {
          return order?.items.some((item) => {
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
  }, [input, orders, user]);

  return (
    <main className="w-screen min-h-screen flex items-center justify-start flex-col bg-primary dark:bg-darkPrimary">
      <div className="w-full flex flex-col items-start justify-center mt-4 px-6 md:px-16 2xl:px-52 gap-7 pb-20">
        <FilterOrders
          input={input}
          setInput={setInput}
          setUserOrders={setUserOrders}
          orders={orderFilters}
        />
        {userOrders && userOrders?.length > 0 ? (
          <>
            {userOrders?.map((item, i) => (
              <OrderData
                key={item.orderId}
                index={i}
                data={item}
                admin={false}
              />
            ))}
          </>
        ) : (
          <>
            <h1 className="text-[72px] text-headingColor dark:text-darkTextColor font-bold">
              No Data
            </h1>
          </>
        )}
      </div>
    </main>
  );
};

export default UsersOrder;
