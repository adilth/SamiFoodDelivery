export function productData(product, activity) {
  const filterActivity = activity?.filter(
    (item) => item.item.id === product.id
  );
  // if (filterActivity.length > 7) {
  //   return filterActivity.slice(-7);
  // }
  console.log(product);
  return {
    id: 1,
    name: product.title,
    img: product.imgURL,
    item: product,
    info: {
      Desc: product.desc,
      productId: product.id,
      color: "white",
      price: product.price,
      category: product.category,
    },
    chart: {
      dataKeys: [
        { name: "visits", color: "#82ca9d" },
        { name: "orders", color: "#8884d8" },
      ],
      data: [
        {
          name: "Sun",
          visits: 510,
          orders: 180,
        },
        {
          name: "Mon",
          visits: 459,
          orders: 125,
        },
        {
          name: "Tue",
          visits: 327,
          orders: 87,
        },
        {
          name: "Wed",
          visits: 380,
          orders: 110,
        },
        {
          name: "Thu",
          visits: 219,
          orders: 65,
        },
        {
          name: "Fri",
          visits: 317,
          orders: 97,
        },
        {
          name: "Sat",
          visits: 538,
          orders: 165,
        },
      ],
    },
    activities: filterActivity?.slice(-7),
  };
}
export function userData(user, activity, orders) {
  let filterActivity = activity.filter(
    (item) => item.userName == user.displayName
  );
  const filterOrder = orders.filter((order) => order.userId == user.uid);
  if (filterActivity.length > 7) {
    filterActivity = filterActivity.slice(-7);
  }
  return {
    id: 1,
    title: filterOrder[0]?.customer?.name,
    img: user.photoURL,
    info: {
      userName: user.DisplayName,
      fullName: filterOrder[0]?.customer?.name,
      email: user.email,
      phone: filterOrder[0]?.customer?.phone,
      status: "verified",
    },
    chart: {
      dataKeys: [
        { name: "visits", color: "#82ca9d" },
        { name: "clicks", color: "#8884d8" },
      ],
      data: [
        {
          name: "Sun",
          visits: 290,
          clicks: 170,
        },
        {
          name: "Mon",
          visits: 120,
          clicks: 45,
        },
        {
          name: "Tue",
          visits: 140,
          clicks: 65,
        },
        {
          name: "Wed",
          visits: 240,
          clicks: 98,
        },
        {
          name: "Thu",
          visits: 112,
          clicks: 32,
        },
        {
          name: "Fri",
          visits: 180,
          clicks: 189,
        },
        {
          name: "Sat",
          visits: 420,
          clicks: 300,
        },
      ],
    },
    activities: filterActivity,
  };
}

export const getUserSpends = (id, orders) => {
  const filterOrder = orders.filter((order) => order.userId == id);
  return filterOrder.reduce((acc, order) => {
    return acc + order.amount;
  }, 0);
};
