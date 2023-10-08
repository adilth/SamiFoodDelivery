import { useState } from "react";
import { FaShoppingCart } from "@react-icons/all-files/fa/FaShoppingCart";
import { FaSignOutAlt } from "@react-icons/all-files/fa/FaSignOutAlt";
import { FaThList } from "@react-icons/all-files/fa/FaThList";
import { FaChevronDown } from "@react-icons/all-files/fa/FaChevronDown";
import { RiDashboardFill } from "@react-icons/all-files/ri/RiDashboardFill";
import { motion } from "framer-motion";
import Avatar from "../assets/img/avatar-icon.png";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Link, NavLink } from "react-router-dom";
import { app } from "../firebase.config";
import Logo from "../assets/png/logo-color-removebg-preview-min.png";
import { useStateValue } from "../context/stateProvider";
import { actionTypes } from "../context/reducer";
import { useShowCard } from "../utils/getAllData";
import {
  buttonTap,
  buttonTapFar,
  buttonTapSoft,
  fadeIn,
  fadeInOutWithScale,
  fadeInOutWithTransition,
} from "../animations/motion";
import { isActiveStyles, isNotActiveStyles } from "../utils/data";
import { saveUser } from "../utils/firebaseFunc";
import ThemeButton from "./ThemeButton";
import useTheme from "../hooks/useTheme";
import { useMediaQuery } from "react-responsive";
const Header = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  let mobileNav = useMediaQuery({ query: "(max-width: 620px)" });
  const [{ user, foodCart }, dispatch] = useStateValue();
  const [isMenu, setMenu] = useState(false);
  const [theme, setTheme] = useTheme();

  function handleDarkAndLight() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }
  const login = async () => {
    if (!user) {
      const {
        user: { providerData },
      } = await signInWithPopup(firebaseAuth, provider);
      dispatch({
        type: actionTypes.SET_USER,
        user: providerData[0],
      });
      await saveUser({ ...providerData[0], createAt: `${Date.now()}` });
      localStorage.setItem("user", JSON.stringify(providerData[0]));
    } else {
      setMenu(!isMenu);
    }
  };
  const logOut = () => {
    setMenu(false);
    localStorage.clear();
    dispatch({
      type: actionTypes.SET_USER,
      user: null,
    });
  };
  //call shopping cart action from getAllData
  const showCart = useShowCard();
  return (
    <header
      className="fixed bg-primary dark:bg-darkCardBody z-50 w-full p-3 px-4 md:py-4 md:px-10 lg:px-12"
      onMouseEnter={() => setMenu(false)}
    >
      {/* screen */}
      {!mobileNav ? (
        <div className=" sm:flex w-full h-full justify-between">
          <Link to={"/"} className="flex items-center gap-2">
            <img
              src={Logo}
              className="w-36 object-cover dark:invert dark:brightness-0"
              alt="logo"
            />
          </Link>
          <nav className="flex items-center gap-3 md:gap-6">
            <motion.ul
              {...fadeInOutWithTransition}
              className="flex items-center gap-2 md:gap-6 ml-auto"
            >
              <NavLink
                to={"/"}
                className={({ isActive }) =>
                  isActive ? isActiveStyles : isNotActiveStyles
                }
              >
                Home
              </NavLink>
              <NavLink
                to={"/menu"}
                className={({ isActive }) =>
                  isActive ? isActiveStyles : isNotActiveStyles
                }
              >
                Menu
              </NavLink>
              <NavLink
                to={"/aboutUs"}
                className={({ isActive }) =>
                  isActive ? isActiveStyles : isNotActiveStyles
                }
              >
                About Us
              </NavLink>
              <NavLink
                to={"/services"}
                className={({ isActive }) =>
                  isActive ? isActiveStyles : isNotActiveStyles
                }
              >
                Service
              </NavLink>
            </motion.ul>
            <ThemeButton
              theme={theme}
              handleDarkAndLight={handleDarkAndLight}
            />
            <ShoppingCart onClick={showCart} foodCart={foodCart} />
            {user ? (
              <div className="relative">
                <div className="flex flex-col items-end">
                  <motion.img
                    {...buttonTap}
                    src={user ? user.photoURL : Avatar}
                    onMouseEnter={() => setMenu(true)}
                    alt="avatar image"
                    referrerPolicy="no-referrer"
                    className="w-10 min-[40px] h-10 min-h-[40px] drop-shadow-xl rounded-full cursor-pointer "
                  />
                  <FaChevronDown
                    className="text-sm font-bold -mt-2.5 -mr-2 z-10"
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
              <>
                <NavLink onClick={login}>
                  <motion.button
                    {...buttonTap}
                    className="px-3 py-2 rounded-md shadow-md bg-lightOverlay border border-red-300 cursor-pointer"
                  >
                    Login
                  </motion.button>
                </NavLink>
              </>
            )}
          </nav>
        </div>
      ) : (
        <div className="flex justify-between items-center w-full h-full">
          <Link to={"/"} className="flex items-center gap-2">
            <img
              src={Logo}
              className="w-36 object-cover dark:invert dark:brightness-0"
              alt="logo"
            />
          </Link>
          <nav className="flex gap-5 items-center">
            <ThemeButton
              theme={theme}
              handleDarkAndLight={handleDarkAndLight}
            />
            <ShoppingCart onClick={showCart} foodCart={foodCart} />
            <div className="relative">
              <motion.img
                {...buttonTapFar}
                src={user ? user.photoURL : Avatar}
                className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
                alt="userprofile"
                onClick={login}
                onMouseEnter={() => setMenu(true)}
              />
              {isMenu && (
                <motion.div
                  {...fadeInOutWithScale}
                  onMouseLeave={() => setMenu(false)}
                  className="w-40 bg-gray-50 dark:bg-gray-700 shadow-xl rounded-lg flex flex-col absolute top-12 right-0"
                >
                  <SubMenu user={user} />
                  <ul className="flex flex-col ">
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
                      Service
                    </li>
                  </ul>

                  <p
                    className="m-2 p-2 rounded-md shadow-md flex items-center justify-center bg-gray-200 dark:bg-darkPrimary gap-3 cursor-pointer hover:bg-gray-300 transition-all duration-100 ease-in-out text-textColor dark:text-darkTextColor text-base"
                    onClick={logOut}
                  >
                    Logout <FaShoppingCart />
                  </p>
                </motion.div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

function ShoppingCart({ onClick, foodCart }) {
  return (
    <motion.div
      {...buttonTapSoft}
      className="relative flex items-center justify-center"
      onClick={onClick}
    >
      <FaShoppingCart className="text-textColor dark:text-darkTextColor text-2xl md:ml-8 cursor-pointer" />
      {foodCart && foodCart?.length > 0 && (
        <div className="absolute -top-0 md:-top-3 -right-1 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
          <p className="text-xs text-white font-demibold">{foodCart?.length}</p>
        </div>
      )}
    </motion.div>
  );
}
function SubMenu({ user }) {
  return (
    <>
      {user && user.email === "rajaadil19952019@gmail.com" && (
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
  );
}
export default Header;
