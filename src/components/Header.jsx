import React, { useState } from "react";
import { FaShoppingCart, FaPlus, FaSignOutAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import Avatar from "../assets/img/avatar-icon.png";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Link } from "react-router-dom";

import { app } from "../firebase.config";
import Logo from "../assets/png/logo-color-removebg-preview-min.png";
import { useStateValue } from "../context/stateProvider";
import { actionTypes } from "../context/reducer";

const Header = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [{ user }, dispatch] = useStateValue();
  const [isMenu, setMenu] = useState(false);
  const login = async () => {
    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(firebaseAuth, provider);
      dispatch({
        type: actionTypes.SET_USER,
        user: providerData[0],
      });
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

  return (
    <header className="fixed bg-primary z-50 w-full p-3 px-4 md:p-5 md:px-16">
      {/* screen */}
      <div className="hidden md:flex w-full h-full justify-between">
        <Link to={"/"} className="flex items-center gap-2">
          <img src={Logo} className="w-36 object-cover" alt="logo" />
        </Link>
        <div className="flex items-center gap-8">
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex  items-center gap-8 ml-auto"
          >
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Home
            </li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Menu
            </li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              About Us
            </li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Service
            </li>
          </motion.ul>
          <ShoppingCart />
          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.7 }}
              src={user ? user.photoURL : Avatar}
              alt="avatar image"
              className="w-10 min-[40px] h-10 min-h-[40px] drop-shadow-xl rounded-full cursor-pointer"
              onClick={login}
            />
            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="w-40 absolute flex flex-col top-12 right-0 bg-gray-50 shadow-xl rounded-lg "
              >
                {user && user.email === "rajaadil19952019@gmail.com" && (
                  <Link to={"/createItems"}>
                    <p
                      className="px-4 py-2 flex items-center justify-between cursor-pointer hover:bg-slate-300 transition-colors duration-100 ease-in-out text-textColor text-base "
                      onClick={() => setMenu(false)}
                    >
                      New Item <FaPlus />
                    </p>
                  </Link>
                )}
                <p
                  className="px-4 py-2 flex items-center justify-between cursor-pointer hover:bg-slate-300 transition-colors duration-100 ease-in-out text-textColor text-base "
                  onClick={logOut}
                >
                  Log out <FaSignOutAlt />
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      {/* mobile */}
      <div className="flex justify-between md:hidden w-full h-full">
        <Link to={"/"} className="flex items-center gap-2">
          <img src={Logo} className="w-36 object-cover" alt="logo" />
        </Link>
        <div className="flex gap-4">
          <ShoppingCart />
          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.6 }}
              src={user ? user.photoURL : Avatar}
              className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
              alt="userprofile"
              onClick={login}
            />
            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0"
              >
                {user && user.email === "vetrivel.galaxy@gmail.com" && (
                  <Link to={"/createItem"}>
                    <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">
                      New Item <FaPlus />
                    </p>
                  </Link>
                )}

                <ul className="flex flex-col ">
                  <li
                    className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2"
                    onClick={() => setMenu(false)}
                  >
                    Home
                  </li>
                  <li
                    className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2"
                    onClick={() => setMenu(false)}
                  >
                    Menu
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

function ShoppingCart() {
  const [{ cartShow, cartItems }, dispatch] = useStateValue();
  const showCart = () => {
    dispatch({
      type: actionTypes.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };
  return (
    <div
      className="relative flex items-center justify-center"
      onClick={showCart}
    >
      <FaShoppingCart className="text-textColor text-2xl ml-8 cursor-pointer" />
      {/* {cartItems && cartItems.length > 0 && ( */}
      <div className="absolute -top-0 md:-top-3 -right-1 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
        <p className="text-xs text-white font-demibold">
          3 {/* {cartItems.length} */}
        </p>
      </div>
      {/* )} */}
    </div>
  );
}
export default Header;
