import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../context/stateProvider";

function Search() {
  const [input, setInput] = useState("");
  const [{ foodItems }, dispatch] = useStateValue();
  const navigate = useNavigate();
  //   const submitHandler = (e) => {
  //  e.preventDefault();
  const searchedProduct = foodItems.filter((item) => {
    if (input.value === "") {
      return item;
    }
    if (item.title.toLowerCase().includes(input.toLowerCase())) {
      return item;
    } else {
      return console.log("not found");
    }
  });
  //   };
  return (
    //  <Form onSubmit={submitHandler}>
    <div className="relative">
      <input
        onChange={(e) => setInput(e.target.value)}
        type="text"
        className="px-2 py-5 rounded-lg"
        value={input}
      />
      <FaSearch className="absolute top-[50%] left-0 translate-x-full translate-y-1/2" />
    </div>
    //  </Form>
  );
}

export default Search;
