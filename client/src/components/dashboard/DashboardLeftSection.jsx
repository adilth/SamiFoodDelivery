/* eslint-disable indent */
import { NavLink, useLocation } from "react-router-dom";
import { isActiveStyles, isNotActiveStyles } from "../../utils/data";
import Logo from "../../assets/png/logo-color-removebg-preview-min.png";
import { BsPieChartFill } from "@react-icons/all-files/bs/BsPieChartFill";
import { BiListPlus } from "@react-icons/all-files/bi/BiListPlus";
import { BiAddToQueue } from "@react-icons/all-files/bi/BiAddToQueue";
import { MdMenu } from "@react-icons/all-files/md/MdMenu";
import { MdArrowForward } from "@react-icons/all-files/md/MdArrowForward";
import { FaMotorcycle } from "@react-icons/all-files/fa/FaMotorcycle";
import { FaUsers } from "@react-icons/all-files/fa/FaUsers";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import useClickOutside from "../../hooks/useClickOutside";

function DashboardLeftSection() {
  let showMenu = useMediaQuery({ query: "(max-width: 738px)" });
  const [menu, setMenu] = useState(showMenu ? false : true);
  const sidebarRef = useRef();
  const { pathname } = useLocation();
  useClickOutside(sidebarRef, () => {
    setMenu(true);
  });
  function toggleMenu() {
    setMenu(!menu);
  }

  useEffect(() => {
    if (showMenu) {
      setMenu(false);
    } else {
      setMenu(true);
    }
  }, [showMenu]);
  useEffect(() => {
    showMenu && setMenu(false);
  }, [pathname, showMenu]);
  const variants = showMenu
    ? {
        open: {
          x: 0,
          width: "15rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          x: -250,
          width: 0,
          transition: {
            damping: 40,
            delay: 0.15,
          },
        },
      }
    : {
        open: { width: "15rem" },
        closed: {
          width: "5rem",
          transition: {
            damping: 40,
          },
        },
      };
  return (
    <div>
      {showMenu && (
        <MdMenu
          onClick={() => setMenu(true)}
          className={`md:hidden absolute top-4 cursor-pointer left-2 max-h-screen z-[998] text-2xl text-black/50 dark:text-darkHeadingColor ${
            menu ? "hidden" : "block"
          } `}
        />
      )}
      <motion.div
        ref={sidebarRef}
        initial={{ x: showMenu ? -250 : 0 }}
        animate={menu ? "open" : "closed"}
        variants={variants}
        className={` h-screen overflow-hidden md:relative fixed inset-0 z-[999] bg-card dark:bg-darkCardBody drop-shadow-xl backdrop-blur-md shadow-md max-w-[15rem] w-52`}
      >
        <div className="py-10 flex flex-col gap-5 ">
          {menu ? (
            <MdMenu
              className=" absolute right-4 top-5 w-6 h-8 cursor-pointer"
              onClick={toggleMenu}
            />
          ) : (
            <MdArrowForward
              className=" absolute right-4 top-5 w-7 h-8 cursor-pointer "
              onClick={toggleMenu}
            />
          )}
          <NavLink
            to={"/"}
            className="flex items-center justify-start px-3 gap-4 mt-5 mb-2 dark:invert dark:brightness-0"
          >
            <img
              src={Logo}
              className={`${menu ? "w-36" : "w-18"} ${setMenu ? "" : "hidden"}`}
              alt="logo"
            />
          </NavLink>
          <hr />
          <ul className="flex flex-col gap-4">
            <NavLink
              to={"/dashboard/home"}
              className={({ isActive }) =>
                isActive
                  ? `${isActiveStyles} px-4 py-2 border-l-8  border-red-500`
                  : isNotActiveStyles
              }
            >
              <BsPieChartFill className="text-xl pl-1" />{" "}
              {menu && <span>Home</span>}
            </NavLink>
            <NavLink
              to={"/dashboard/orders"}
              className={({ isActive }) =>
                isActive
                  ? `${isActiveStyles} px-4 py-2 border-l-8  border-red-500`
                  : isNotActiveStyles
              }
            >
              <FaMotorcycle className=" text-3xl pl-1" />
              {menu && <span>Orders</span>}
            </NavLink>
            <NavLink
              to={"/dashboard/items"}
              className={({ isActive }) =>
                isActive
                  ? `${isActiveStyles} px-4 py-2 border-l-8  border-red-500`
                  : isNotActiveStyles
              }
            >
              <BiListPlus className=" text-3xl pl-1" />{" "}
              {menu && <span>Items</span>}
            </NavLink>
            <NavLink
              to={"/dashboard/newItem"}
              className={({ isActive }) =>
                isActive
                  ? `${isActiveStyles} px-4 py-2 border-l-8  border-red-500`
                  : isNotActiveStyles
              }
            >
              <BiAddToQueue className=" text-2xl pl-1" />
              {menu && <span>Add New Item</span>}
            </NavLink>
            <NavLink
              to={"/dashboard/users"}
              className={({ isActive }) =>
                isActive
                  ? `${isActiveStyles} px-4 py-2 border-l-8  border-red-500`
                  : isNotActiveStyles
              }
            >
              <FaUsers className=" text-2xl pl-1" />{" "}
              {menu && <span>Users</span>}
            </NavLink>
          </ul>
          {menu && (
            <div className="w-full items-center flex h-225 mt-auto px-2">
              <div className="w-full h-full rounded-md bg-red-400 flex items-center justify-center flex-col gap-3 px-3 py-2">
                <div className="w-12 h-12 borde bg-white rounded-full flex items-center justify-center">
                  <p className="text-2xl font-bold text-red-500">?</p>
                </div>
                <p className="text-xl text-primary font-semibold">
                  Help Center
                </p>
                <p className="text-base text-gray-300 text-center">
                  Having trouble in city. Please contact us for more questions
                </p>
                <p className="px-4 py-2 rounded-full bg-primary dark:text-darkPrimary text-red-400 cursor-pointer">
                  Get in touch
                </p>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default DashboardLeftSection;
