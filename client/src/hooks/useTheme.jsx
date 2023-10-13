import { useEffect } from "react";
import useLocalStorage from "./foodItemsHooks";

export default function useTheme() {
  const [theme, setTheme] = useLocalStorage("theme", "light");
  useEffect(() => {
    const colorName = "dark";
    const bodyClass = window.document.body.classList;
    theme === "dark" ? bodyClass.add(colorName) : bodyClass.remove(colorName);
  }, [theme]);
  return [theme, setTheme];
}
