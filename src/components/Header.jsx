import React, { useState } from "react";
import { FaShoppingCart, FaPlus, FaSignOutAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import Avatar from "../assets/img/avatar-icon.png";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Link, NavLink } from "react-router-dom";

import { app } from "../firebase.config";
import Logo from "../assets/png/logo-color-removebg-preview-min.png";
import { useStateValue } from "../context/stateProvider";
import { actionTypes } from "../context/reducer";
import { showMenuCart } from "../utils/getAllData";
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
const Header = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [{ user, foodCart }, dispatch] = useStateValue();
  const [isMenu, setMenu] = useState(false);
  const login = async () => {
    if (!user) {
      const {
        user: { providerData },
      } = await signInWithPopup(firebaseAuth, provider);
      console.log(providerData);
      dispatch({
        type: actionTypes.SET_USER,
        user: providerData[0],
      });
      console.log(providerData[0].uid);
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
  const showCart = showMenuCart();
  return (
    <header className="fixed bg-primary z-50 w-full p-3 px-4 md:py-4 md:px-12">
      {/* screen */}
      <div className="hidden sm:flex w-full h-full justify-between">
        <Link to={"/"} className="flex items-center gap-2">
          <img src={Logo} className="w-36 object-cover" alt="logo" />
        </Link>
        <div className="flex items-center gap-6">
          <motion.ul
            {...fadeInOutWithTransition}
            className="flex items-center gap-6 ml-auto"
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
              to={"/aboutus"}
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
          <ShoppingCart onClick={showCart} foodCart={foodCart} />
          {user ? (
            <div className="relative">
              <motion.img
                {...buttonTap}
                src={user ? user.photoURL : Avatar}
                onMouseEnter={() => setMenu(true)}
                alt="avatar image"
                referrerPolicy="no-referrer"
                className="w-10 min-[40px] h-10 min-h-[40px] drop-shadow-xl rounded-full cursor-pointer"
              />
              {isMenu && (
                <motion.div
                  {...fadeIn}
                  onMouseLeave={() => setMenu(false)}
                  className="w-40 absolute flex flex-col top-12 right-0 bg-gray-50 shadow-xl rounded-lg "
                >
                  {user && user.email === "rajaadil19952019@gmail.com" && (
                    <Link to={"/dashboard/home"}>
                      <p className="px-4 py-2 flex items-center justify-between cursor-pointer hover:bg-slate-300 transition-colors duration-100 ease-in-out text-textColor text-base ">
                        Dashboard <FaPlus />
                      </p>
                    </Link>
                  )}
                  <Link to={"/dashboard/orders"}>
                    <p className="px-4 py-2 flex items-center justify-between cursor-pointer hover:bg-slate-300 transition-colors duration-100 ease-in-out text-textColor text-base ">
                      Orders <FaSignOutAlt />
                    </p>
                  </Link>
                  <p
                    className="px-4 py-2 flex items-center justify-between cursor-pointer hover:bg-slate-300 transition-colors duration-100 ease-in-out text-textColor text-base "
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
        </div>
      </div>
      {/* mobile */}
      <div className="flex justify-between sm:hidden w-full h-full">
        <Link to={"/"} className="flex items-center gap-2">
          <img src={Logo} className="w-36 object-cover" alt="logo" />
        </Link>
        <div className="flex gap-4">
          <ShoppingCart onClick={showCart} foodCart={foodCart} />
          <div className="relative">
            <motion.img
              {...buttonTapFar}
              src={user ? user.photoURL : Avatar}
              className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
              alt="userprofile"
              onClick={login}
            />
            {isMenu && (
              <motion.div
                {...fadeInOutWithScale}
                className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0"
              >
                {user && user.email === "rajaadil19952019@gmail.com" && (
                  <Link to={"/createItem"}>
                    <p className="px-4 py-2 flex items-center justify-between gap-2 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">
                      New Item <FaPlus />
                    </p>
                  </Link>
                )}

                <ul className="flex flex-col ">
                  <li
                    className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2"
                    onClick={() => setMenu(false)}
                  >
                    <Link to={"/"}>Home</Link>
                  </li>
                  <li
                    className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2"
                    onClick={() => setMenu(false)}
                  >
                    <Link to={"/menu"}> Menu</Link>
                  </li>
                  <li
                    className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2"
                    onClick={() => setMenu(false)}
                  >
                    About Us
                  </li>
                  <li
                    className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2"
                    onClick={() => setMenu(false)}
                  >
                    Service
                  </li>
                </ul>

                <p
                  className="m-2 p-2 rounded-md shadow-md flex items-center justify-center bg-gray-200 gap-3 cursor-pointer hover:bg-gray-300 transition-all duration-100 ease-in-out text-textColor text-base"
                  onClick={logOut}
                >
                  Logout <FaShoppingCart />
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
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
      <FaShoppingCart className="text-textColor text-2xl ml-8 cursor-pointer" />
      {foodCart && foodCart?.length > 0 && (
        <div className="absolute -top-0 md:-top-3 -right-1 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
          <p className="text-xs text-white font-demibold">{foodCart?.length}</p>
        </div>
      )}
    </motion.div>
  );
}
export default Header;
