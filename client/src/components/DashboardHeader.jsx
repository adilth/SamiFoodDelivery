import { BsFillBellFill } from "react-icons/bs";
import { MdLogout } from "react-icons/md";
import { useStateValue } from "../context/stateProvider";
import Avatar from "../assets/img/avatar-icon.png";
import { actionTypes } from "../context/reducer";
import { motion } from "framer-motion";
import { buttonTap } from "../animations/motion";
import { useNavigate } from "react-router-dom";
function DashboardHeader() {
  const [{ user }, dispatch] = useStateValue();
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
    <div className="w-full flex items-center justify-between gap-3">
      <p className="text-2xl text-headingColor hidden md:block ">
        Welcome to SamiFood
        {user?.displayName && (
          <span className="block text-base text-gray-500">{`Hello ${user?.displayName}...!`}</span>
        )}
      </p>

      <div className=" flex items-center justify-end gap-4 ">
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
              whileHover={{ scale: 1.15 }}
              referrerPolicy="no-referrer"
            />
          </div>

          <motion.div
            {...buttonTap}
            onClick={signOut}
            className="w-10 h-10 rounded-md cursor-pointer bg-lightOverlay backdrop-blur-md shadow-md flex items-center justify-center"
          >
            <MdLogout className="text-gray-400 text-xl" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;
