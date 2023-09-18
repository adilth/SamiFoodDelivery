import { useEffect, useState } from "react";
import { FilterOrders, Header, OrderData } from "../components";
import { useStateValue } from "../context/stateProvider";
import { actionTypes } from "../context/reducer";

const UsersOrder = () => {
  const [{ user, orders }, dispatch] = useStateValue();
  const [input, setInput] = useState("");
  const [userOrders, setUserOrders] = useState(null);
  useEffect(() => {
    if (!orders) {
      dispatch({
        type: actionTypes.GET_ALL_ORDERS,
        orders: setUserOrders(data.filter((item) => item.userId === user?.uid)),
      });
    } else {
      setUserOrders(orders.filter((data) => data.userId === user?.uid));
    }
  }, [orders]);
  const submitHandler = (data) => {
    return data?.filter((order) => {
      if (order?.items) {
        return order.items.some((item) => {
          console.log(item);

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
  };
  return (
    <main className="w-screen min-h-screen flex items-center justify-start flex-col bg-primary">
      <Header />
      <div className="w-full flex flex-col items-start justify-center mt-32 px-6 md:px-16 2xl:px-52 gap-12 pb-24">
        <FilterOrders input={input} setInput={setInput} orders={orders} />
        {submitHandler(userOrders) && submitHandler(userOrders)?.length > 0 ? (
          <>
            {submitHandler(userOrders)?.map((item, i) => (
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
