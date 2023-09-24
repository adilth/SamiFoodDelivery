import { useEffect, useState } from "react";
import { FilterOrders, Header, OrderData } from "../components";
import { useStateValue } from "../context/stateProvider";
import { actionTypes } from "../context/reducer";

const UsersOrder = () => {
  const [{ user, orders }, dispatch] = useStateValue();
  const [input, setInput] = useState("");
  const [userOrders, setUserOrders] = useState(null);
  // useEffect(() => {
  //   if (!orders) {
  //     dispatch({
  //       type: actionTypes.GET_ALL_ORDERS,
  //       orders: setUserOrders(data?.filter((item) => item.userId === user.uid)),
  //     });
  //   } else {
  //     setUserOrders(orders?.filter((data) => data.userId === user.uid));
  //   }
  // }, [orders, user.uid]);
  // useEffect(() => {
  //   console.log(user, orders);
  //   if (user?.uid) {
  //     // Filter orders based on the user's ID
  //     const userFilteredOrders = orders?.filter(
  //       (order) => order.userId === user.uid
  //     );
  //     setUserOrders(userFilteredOrders);
  //   }
  // }, [user, orders]);
  let orderFilters = orders.filter((item) => item.userId === user.uid);

  useEffect(() => {
    if (orders) {
      const filteredOrders = orders.filter((order) => {
        // Check if the order belongs to the current user
        if (order.userId !== user?.uid) {
          return false;
        }
        // Check the search criteria within the order's items
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
  }, [input, orders, user]);

  return (
    <main className="w-screen min-h-screen flex items-center justify-start flex-col bg-primary">
      <Header />
      <div className="w-full flex flex-col items-start justify-center mt-24 px-6 md:px-16 2xl:px-52 gap-7 pb-20">
        <FilterOrders
          input={input}
          setInput={setInput}
          setUserOrders={setUserOrders}
          orders={orderFilters}
        />
        {userOrders && userOrders?.length > 0 ? (
          <>
            {userOrders?.map((item, i) => (
              <OrderData key={i} index={i} data={item} admin={false} />
            ))}
          </>
        ) : (
          <>
            <h1 className="text-[72px] text-headingColor font-bold">No Data</h1>
          </>
        )}
      </div>
    </main>
  );
};

export default UsersOrder;
