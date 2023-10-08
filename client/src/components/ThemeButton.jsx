import { motion } from "framer-motion";
import { FaMoon } from "@react-icons/all-files/fa/FaMoon";
import { IoSunnySharp } from "@react-icons/all-files/io5/IoSunnySharp";
import { buttonTap } from "../animations/motion";

function ThemeButton({ theme, handleDarkAndLight }) {
  return (
    <motion.div className="w-3" {...buttonTap}>
      {theme === "dark" ? (
        <FaMoon
          className=" cursor-pointer text-lg"
          onClick={handleDarkAndLight}
        />
      ) : (
        <IoSunnySharp
          className=" cursor-pointer text-2xl dark:text-darkTextColor"
          onClick={handleDarkAndLight}
        />
      )}
    </motion.div>
  );
}

export default ThemeButton;
