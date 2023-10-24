import { motion } from "framer-motion";
import {
  buttonTap,
  buttonTapFar,
  buttonTapSoft,
  fadeIn,
  fadeInOutWithScale,
  fadeInOutWithTransition,
} from "../animations/motion";
import { isActiveStyles, isNotActiveStyles } from "../utils/data";
import { NavLink } from "react-router-dom";
import ThemeButton from "./ThemeButton";
import { FaShoppingCart } from "@react-icons/all-files/fa/FaShoppingCart";
import { FaSignOutAlt } from "@react-icons/all-files/fa/FaSignOutAlt";
import { FaChevronDown } from "@react-icons/all-files/fa/FaChevronDown";
import { RiDashboardFill } from "@react-icons/all-files/ri/RiDashboardFill";
import { FaThList } from "@react-icons/all-files/fa/FaThList";
import { Link } from "react-router-dom";
import Avatar from "../assets/img/avatar-icon.png";
export const DesktopNav = ({
  user,
  theme,
  handleDarkAndLight,
  showCart,
  login,
  logOut,
  setMenu,
  sidebarRef,
  foodCart,
  isMenu,
}) => (
  <nav className="flex items-center gap-3 md:gap-6 ml-auto">
    <motion.ul
      {...fadeInOutWithTransition}
      className="flex items-center gap-2 md:gap-4 lg:gap-6 ml-auto"
    >
      <li className="list-none">
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            isActive ? isActiveStyles : isNotActiveStyles
          }
        >
          Home
        </NavLink>
      </li>
      <li className="list-none">
        <NavLink
          to={"/menu"}
          className={({ isActive }) =>
            isActive ? isActiveStyles : isNotActiveStyles
          }
        >
          Menu
        </NavLink>
      </li>
      <li className="list-none">
        <NavLink
          to={"/aboutUs"}
          className={({ isActive }) =>
            isActive ? isActiveStyles : isNotActiveStyles
          }
        >
          About Us
        </NavLink>
      </li>
      <li className="list-none">
        <NavLink
          to={"/contact"}
          className={({ isActive }) =>
            isActive ? isActiveStyles : isNotActiveStyles
          }
        >
          Contact Us
        </NavLink>
      </li>
    </motion.ul>
    <ThemeButton theme={theme} handleDarkAndLight={handleDarkAndLight} />
    <ShoppingCart onClick={showCart} foodCart={foodCart} />
    {user ? (
      <div className="relative">
        <div className="flex items-center gap-0.5">
          <motion.img
            {...buttonTap}
            src={user ? user.photoURL : Avatar}
            onMouseEnter={() => setMenu(true)}
            ref={sidebarRef}
            alt="avatar image"
            referrerPolicy="no-referrer"
            className="w-10 min-[40px] h-10 min-h-[40px] drop-shadow-xl rounded-full cursor-pointer "
          />
          <FaChevronDown
            className="text-sm font-bold -mt-3 z-10"
            onMouseEnter={() => setMenu(true)}
          />
        </div>

        {isMenu && (
          <motion.div
            {...fadeIn}
            onMouseLeave={() => setMenu(false)}
            className="w-40 absolute flex flex-col top-12 right-0 bg-gray-50 dark:bg-darkCardBody shadow-xl rounded-lg "
          >
            <SubMenu user={user} />
            <p
              className="px-4 py-2 flex items-center justify-between cursor-pointer hover:bg-slate-300 dark:hover:bg-darkCardBodyHover transition-colors duration-100 ease-in-out text-textColor dark:text-darkTextColor text-base "
              onClick={logOut}
            >
              Log out <FaSignOutAlt />
            </p>
          </motion.div>
        )}
      </div>
    ) : (
      <NavLink onClick={login}>
        <motion.button
          {...buttonTap}
          className="px-3 py-2 rounded-md shadow-md bg-lightOverlay border border-red-300 cursor-pointer"
        >
          Login
        </motion.button>
      </NavLink>
    )}
  </nav>
);

export const MobileNav = ({
  user,
  theme,
  handleDarkAndLight,
  showCart,
  login,
  logOut,
  setMenu,
  sidebarRef,
  foodCart,
  isMenu,
}) => (
  <nav className="flex gap-4 items-center">
    <ThemeButton theme={theme} handleDarkAndLight={handleDarkAndLight} />
    <ShoppingCart onClick={showCart} foodCart={foodCart} />
    <div className="relative">
      <div className="flex items-center gap-1">
        <motion.img
          {...buttonTapFar}
          src={user ? user.photoURL : Avatar}
          className={`w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full ${
            !user && "dark:invert dark:brightness-100"
          }`}
          alt="user profile"
          onClick={login}
          ref={sidebarRef}
          onMouseEnter={() => setMenu(true)}
        />
        <FaChevronDown
          className="text-sm font-bold z-10 -mt-3"
          onMouseEnter={() => setMenu(true)}
        />
      </div>
      {isMenu && (
        <motion.div
          {...fadeInOutWithScale}
          onMouseLeave={() => setMenu(false)}
          className="w-40 bg-gray-50 dark:bg-gray-700 shadow-xl rounded-lg flex flex-col absolute top-10 right-0"
        >
          <SubMenu user={user} />
          <ul className="flex flex-col list-none">
            <li
              className="px-4 py-2 text-base text-textColor dark:text-darkTextColor dark:hover:bg-darkCardBodyHover hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 "
              onClick={() => setMenu(false)}
            >
              <Link to={"/"}>Home</Link>
            </li>
            <li
              className="px-4 py-2 text-base text-textColor dark:text-darkTextColor dark:hover:bg-darkCardBodyHover hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100"
              onClick={() => setMenu(false)}
            >
              <Link to={"/menu"}> Menu</Link>
            </li>
            <li
              className="px-4 py-2 text-base text-textColor dark:text-darkTextColor dark:hover:bg-darkCardBodyHover hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100"
              onClick={() => setMenu(false)}
            >
              <Link to={"/aboutUs"}>About Us</Link>
            </li>
            <li
              className="px-4 py-2 text-base text-textColor dark:text-darkTextColor dark:hover:bg-darkCardBodyHover hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100"
              onClick={() => setMenu(false)}
            >
              <Link to={"/contact"}>Contact Us</Link>
            </li>
          </ul>
          {user && (
            <p
              className="m-2 p-2 rounded-md shadow-md flex items-center justify-center bg-gray-200 dark:bg-darkPrimary gap-3 cursor-pointer hover:bg-gray-300 transition-all duration-100 ease-in-out text-textColor dark:text-darkTextColor text-base"
              onClick={logOut}
            >
              Logout <FaShoppingCart />
            </p>
          )}
        </motion.div>
      )}
    </div>
  </nav>
);

function ShoppingCart({ onClick, foodCart }) {
  return (
    <motion.div
      {...buttonTapSoft}
      className="relative flex items-center justify-center"
      onClick={onClick}
    >
      <FaShoppingCart className="text-textColor dark:text-darkTextColor text-2xl cursor-pointer" />
      {foodCart && foodCart?.length > 0 && (
        <div className="absolute -top-3 -right-1 w-5 h-5  rounded-full bg-cartNumBg flex items-center justify-center">
          <p className="text-xs text-white font-demibold">{foodCart?.length}</p>
        </div>
      )}
    </motion.div>
  );
}

function SubMenu({ user }) {
  return (
    <>
      {user && (
        <>
          {user.email === "rajaadil19952019@gmail.com" && (
            <Link to={"/dashboard/home"}>
              <p className="px-4 py-2 flex items-center justify-between gap-2 cursor-pointer hover:bg-slate-100 dark:hover:bg-darkCardBodyHover transition-all duration-100 ease-in-out text-textColor dark:text-darkTextColor text-base">
                Dashboard <RiDashboardFill />
              </p>
            </Link>
          )}
          <Link
            className=" hover:text-red-500 text-base text-textColor flex items-center justify-between cursor dark:text-darkTextColor px-4 py-2 hover:bg-slate-100 dark:hover:bg-darkCardBodyHover transition-all duration-100 ease-in-out"
            to={"/userOrder"}
          >
            Orders <FaThList />
          </Link>
        </>
      )}
    </>
  );
}
