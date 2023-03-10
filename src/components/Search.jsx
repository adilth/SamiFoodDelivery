import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useStateValue } from "../context/stateProvider";
import FoodRows from "./FoodRows";

function Search() {
  const [input, setInput] = useState("");
  const [{ foodItems }, dispatch] = useStateValue();
  const [foodFields, setFoodFields] = useState("default");
  const handleSelectFields = (data) => {
    if (foodFields == "ascending") {
      return data.sort((a, b) => a.title.localeCompare(b.title));
    } else if (foodFields == "descending") {
      return data.sort((a, b) => -a.title.localeCompare(b.title));
    } else if (foodFields == "high-price") {
      return data.sort((a, b) => a.price - b.price);
    } else if (foodFields == "low-price") {
      return data.sort((a, b) => b.price - a.price);
    }
  };
  const submitHandler = (data) => {
    return data.filter((item) => {
      console.log(input);
      if (
        item.title.toLowerCase().includes(input.toLowerCase()) ||
        item.category.toLowerCase().includes(input.toLowerCase())
      ) {
        return item;
      } else {
        return console.log("not found");
      }
    });
  };
  useEffect(() => {
    handleSelectFields(foodItems);
  }, [foodFields]);
  return (
    <>
      <div className="flex justify-between w-full">
        <div className="px-4 py-3 cursor-pointer text-end">
          <select
            className="w-50 px-4 py-3 rounded-sm "
            id="foodSearch"
            onChange={(e) => setFoodFields(e.target.value)}
          >
            <option value="default">Default</option>
            <option value="ascending">Alphabetically, A-Z</option>
            <option value="descending">Alphabetically, Z-A</option>
            <option value="high-price">High Price</option>
            <option value="low-price">Low Price</option>
          </select>
        </div>
        <div className="relative w-[290px] mt-2 mb-4">
          <input
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Search..."
            className="w-full px-2 py-4 rounded-xl"
            value={input}
          />
          <FaSearch className="absolute top-[50%] right-6 translate-x-full -translate-y-1/2" />
        </div>
      </div>
      <div className="w-full mt-3">
        <p className="text-2xl font-semibold capitalize relative text-headingColor before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100">
          Our Menu
        </p>
        <FoodRows flag={false} data={submitHandler(foodItems)} splide={false} />
      </div>
    </>
  );
}

export default Search;
