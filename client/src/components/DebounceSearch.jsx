import { useEffect, useState } from "react";
import { FaSearch } from "@react-icons/all-files/fa/FaSearch";

function DebounceSearch({ val, onChange }) {
  const [value, setValue] = useState(val);
  useEffect(() => {
    setValue(val);
  }, [val]);
  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, 500);
    return () => clearTimeout(timeout);
  }, [value, onChange]);

  return (
    <div className="relative">
      <input
        onChange={(e) => setValue(e.target.value)}
        type="text"
        placeholder="Search..."
        className="p-3 rounded-xl border border-gray-400 dark:bg-darkCardBody"
        value={value}
      />
      <FaSearch className="absolute top-[50%] right-7 translate-x-full -translate-y-1/2 text-lg dark:text-darkHeadingColor" />
    </div>
  );
}

export default DebounceSearch;
