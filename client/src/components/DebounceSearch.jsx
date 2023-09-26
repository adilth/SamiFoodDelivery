import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

function DebounceSearch({ value: initValue, onChange }) {
  const [value, setValue] = useState(initValue);
  useEffect(() => {
    setValue(initValue);
  }, [initValue]);
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
        className="p-3 rounded-xl border border-gray-400"
        value={value}
      />
      <FaSearch className="absolute top-[50%] right-7 translate-x-full -translate-y-1/2 text-lg" />
    </div>
  );
}

export default DebounceSearch;
