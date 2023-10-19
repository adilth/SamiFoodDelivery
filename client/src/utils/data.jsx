export const isActiveStyles =
  " text-base text-red-700 font-semibold hover:text-red-700 px-1 lg:px-3 py-2 duration-100 transition-all ease-in-out flex gap-2 items-center";

export const isNotActiveStyles =
  " text-base text-textColor dark:text-darkTextColor hover:text-red-700 dark:hover:text-red-700 duration-200 px-1 lg:px-3 py-2 transition-all ease-in-out flex gap-2 items-center";

export const categories = [
  {
    id: 1,
    name: "Chicken",
    URLSearchParams: "Chicken",
  },
  {
    id: 3,
    name: "Icecreams",
    URLSearchParams: "Icecreams",
  },
  {
    id: 4,
    name: "Fish",
    URLSearchParams: "Fish",
  },
  {
    id: 5,
    name: "Pizza",
    URLSearchParams: "Pizza",
  },
  {
    id: 6,
    name: "Fruit",
    URLSearchParams: "Fruit",
  },
  {
    id: 7,
    name: "Curry",
    URLSearchParams: "Curry",
  },
  {
    id: 8,
    name: "Rice",
    URLSearchParams: "Rice",
  },
  {
    id: 9,
    name: "soft Drinks",
    URLSearchParams: "Drinks",
  },
  {
    id: 10,
    name: "Salad",
    URLSearchParams: "Salad",
  },
];

import userSvg from "../assets/svg/userIcon.svg";
import productIcon from "../assets/svg/productIcon.svg";
import revenueIcon from "../assets/svg/revenueIcon.svg";
import conversionIcon from "../assets/svg/conversionIcon.svg";
export const chartUsers = {
  color: "#8884d8",
  icon: userSvg,
  title: "Total Users",
  number: "9.23",
  dataKey: "users",
  link: "/dashboard/users",
  percentage: 43,
  chartData: [
    { name: "Sun", users: 344 },
    { name: "Mon", users: 123 },
    { name: "Tue", users: 45 },
    { name: "Wen", users: 32 },
    { name: "Thu", users: 123 },
    { name: "Fre", users: 43 },
    { name: "Sat", users: 223 },
  ],
};

export const chartProduct = {
  color: "#05c3c3",
  icon: productIcon,
  title: "Total Products",
  number: "238",
  dataKey: "products",
  link: "/dashboard/items",
  percentage: 21,
  chartData: [
    { name: "Sun", products: 400 },
    { name: "Mon", products: 600 },
    { name: "Tue", products: 500 },
    { name: "Wed", products: 700 },
    { name: "Thu", products: 400 },
    { name: "Fri", products: 500 },
    { name: "Sat", products: 450 },
  ],
};
export const chartRevenue = {
  color: "teal",
  icon: revenueIcon,
  title: "Total Revenue",
  number: "$56.432",
  dataKey: "revenue",
  link: "/dashboard/items",
  percentage: -12,
  chartData: [
    { name: "Sun", revenue: 213 },
    { name: "Mon", revenue: 420 },
    { name: "Tue", revenue: 326 },
    { name: "Wed", revenue: 288 },
    { name: "Thu", revenue: 460 },
    { name: "Fri", revenue: 380 },
    { name: "Sat", revenue: 280 },
  ],
};
export const chartConversion = {
  color: "#849b00",
  icon: conversionIcon,
  title: "Total Ratio",
  number: "2.6",
  dataKey: "ratio",
  link: "/dashboard/items",
  percentage: 12,
  chartData: [
    { name: "Sun", ratio: 400 },
    { name: "Mon", ratio: 334 },
    { name: "Tue", ratio: 500 },
    { name: "Wed", ratio: 222 },
    { name: "Thu", ratio: 400 },
    { name: "Fri", ratio: 531 },
    { name: "Sat", ratio: 450 },
  ],
};

export const barChartRevenue = {
  title: "Profit Earned",
  color: "#8884d8",
  dataKey: "profit",
  chartData: [
    {
      name: "Sun",
      profit: 4000,
    },
    {
      name: "Mon",
      profit: 3000,
    },
    {
      name: "Tue",
      profit: 2000,
    },
    {
      name: "Wed",
      profit: 2780,
    },
    {
      name: "Thu",
      profit: 1890,
    },
    {
      name: "Fri",
      profit: 2390,
    },
    {
      name: "Sat",
      profit: 3490,
    },
  ],
};

export const barChartVisit = {
  title: "Total Visit",
  color: "#FF8042",
  dataKey: "visit",
  chartData: [
    {
      name: "Sun",
      visit: 4000,
    },
    {
      name: "Mon",
      visit: 3000,
    },
    {
      name: "Tue",
      visit: 2000,
    },
    {
      name: "Wed",
      visit: 2780,
    },
    {
      name: "Thu",
      visit: 1890,
    },
    {
      name: "Fri",
      visit: 2390,
    },
    {
      name: "Sat",
      visit: 3490,
    },
  ],
};

export const dataFood = [
  {
    name: "Sun",
    food: 4200,
    drinks: 2400,
    others: 1133,
  },
  {
    name: "Mon",
    food: 3000,
    drinks: 1398,
    others: 900,
  },
  {
    name: "Tue",
    food: 2000,
    drinks: 1900,
    others: 300,
  },
  {
    name: "Wed",
    food: 2780,
    drinks: 2700,
    others: 1200,
  },
  {
    name: "Thu",
    food: 1890,
    drinks: 2000,
    others: 1400,
  },
  {
    name: "Fri",
    food: 2390,
    drinks: 2800,
    others: 500,
  },
  {
    name: "Sat",
    food: 3700,
    drinks: 2700,
    others: 900,
  },
];
