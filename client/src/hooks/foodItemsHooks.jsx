import { useCallback, useEffect, useState } from "react";

export default function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    let currentValue;
    try {
      currentValue = JSON.parse(
        localStorage.getItem(key) || String(defaultValue)
      );
    } catch (error) {
      currentValue = defaultValue;
    }
    return currentValue;
  });
  useEffect(() => {
    if (value === undefined) return localStorage.removeItem(key);
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  const remove = useCallback(() => setValue(undefined), []);
  return [value, setValue, remove];
}
