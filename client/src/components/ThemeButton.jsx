import { motion } from "framer-motion";
import { FaMoon } from "@react-icons/all-files/fa/FaMoon";
import { IoSunnySharp } from "@react-icons/all-files/io5/IoSunnySharp";
import { buttonTapSoft } from "../animations/motion";

function ThemeButton({ theme, handleDarkAndLight }) {
  return (
    <motion.div className="" {...buttonTapSoft}>
      {theme === "dark" ? (
        <IoSunnySharp
          className=" cursor-pointer text-2xl"
          onClick={handleDarkAndLight}
        />
      ) : (
        <FaMoon
          className=" cursor-pointer text-lg dark:text-darkTextColor"
          onClick={handleDarkAndLight}
        />
      )}
    </motion.div>
  );
}

export default ThemeButton;
