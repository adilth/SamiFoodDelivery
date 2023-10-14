import { BsFillBellFill } from "@react-icons/all-files/bs/BsFillBellFill";
import { IoLogOutOutline } from "@react-icons/all-files/io5/IoLogOutOutline";
import { useStateValue } from "../../context/StateProvider";
import Avatar from "../../assets/img/avatar-icon.png";
import { actionTypes } from "../../context/reducer";
import { motion } from "framer-motion";
import { buttonTap } from "../../animations/motion";
import { useNavigate } from "react-router-dom";
import ThemeButton from "../ThemeButton";
import useTheme from "../../hooks/useTheme";
function DashboardHeader() {
  const [{ user }, dispatch] = useStateValue();
  const [theme, setTheme] = useTheme();

  function handleDarkAndLight() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }
  const navigate = useNavigate();
  const signOut = () => {
    localStorage.clear();
    dispatch({
      type: actionTypes.SET_USER,
      user: null,
    });
    navigate("/", { replace: true });
  };
  return (
    <div className="w-full flex items-center justify-end md:justify-between gap-3">
      <p className="text-2xl text-headingColor dark:text-darkHeadingColor hidden md:block ">
        Welcome to SamiFood
        {user?.displayName && (
          <span className="block text-base text-gray-500">{`Hello ${user?.displayName}...!`}</span>
        )}
      </p>

      <div className=" flex items-center justify-end gap-4">
        <ThemeButton theme={theme} handleDarkAndLight={handleDarkAndLight} />
        <motion.div
          {...buttonTap}
          className="w-10 h-10 rounded-md cursor-pointer bg-lightOverlay backdrop-blur-md shadow-md flex items-center justify-center"
        >
          <BsFillBellFill className="text-gray-400 text-xl" />
        </motion.div>

        <div className="flex items-center justify-center gap-2">
          <div className="w-10 h-10 rounded-md shadow-md cursor-pointer overflow-hidden">
            <motion.img
              className="w-full h-full object-cover"
              src={user?.photoURL ? user?.photoURL : Avatar}
              alt="use photo profile"
              whileHover={{ scale: 1.15 }}
              referrerPolicy="no-referrer"
            />
          </div>
          <motion.div
            {...buttonTap}
            onClick={signOut}
            className="w-10 h-10 rounded-md cursor-pointer bg-lightOverlay backdrop-blur-md shadow-md flex items-center justify-center"
          >
            <IoLogOutOutline className="text-gray-400 text-xl" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;
