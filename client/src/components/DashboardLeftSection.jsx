import { NavLink } from "react-router-dom";
import { isActiveStyles, isNotActiveStyles } from "../utils/data";
import Logo from "../assets/png/logo-color-removebg-preview-min.png";
import { BsPieChartFill } from "react-icons/bs";
import { BiAddToQueue, BiListPlus } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdArrowForward, MdDeliveryDining } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function DashboardLeftSection() {
  const [menu, setMenu] = useState(true);
  function toggleMenu() {
    setMenu(!menu);
  }
  const showMenu = window.innerWidth >= 678;

  const variants = {
    open: { width: showMenu ? "15rem" : "12rem" },
    closed: {
      width: showMenu ? "5rem" : "0rem",
      x: showMenu && !menu ? 0 : -60,
    },
  };
  // Function to update menu state based on window width

  // // Add event listener for window resize
  useEffect(() => {
    const updateMenuState = () => {
      setMenu(showMenu);
    };
    updateMenuState(); // Initialize the menu state
    window.addEventListener("resize", updateMenuState);
    return () => {
      window.removeEventListener("resize", updateMenuState);
    };
  }, [showMenu]);

  return (
    <motion.div
      initial={"open"}
      animate={menu ? "open" : "closed"}
      exit="closed"
      variants={variants}
      className={`h-full z-50 bg-card backdrop-blur-md shadow-md ${
        showMenu ? "relative" : "absolute"
      }`}
    >
      {!showMenu ? (
        <GiHamburgerMenu
          className={` absolute ${
            menu ? "right-4" : "-right-24"
          } top-5 w-6 h-8 cursor-pointer z-50`}
          onClick={toggleMenu}
        />
      ) : (
        <MdArrowForward
          className={` absolute ${
            menu ? "right-4" : "-right-24"
          } top-5 w-6 h-8 cursor-pointer z-50`}
          onClick={toggleMenu}
        />
      )}

      <div className="py-10 flex flex-col gap-3 ">
        {showMenu &&
          (menu ? (
            <GiHamburgerMenu
              className=" absolute right-4 top-5 w-6 h-8 cursor-pointer"
              onClick={toggleMenu}
            />
          ) : (
            <MdArrowForward
              className=" absolute right-4 top-5 w-7 h-8 cursor-pointer "
              onClick={toggleMenu}
            />
          ))}

        <NavLink
          to={"/"}
          className="flex items-center justify-start px-3 gap-4 my-5"
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
            <BsPieChartFill className="text-lg" /> {menu && <span>Home</span>}
          </NavLink>
          <NavLink
            to={"/dashboard/orders"}
            className={({ isActive }) =>
              isActive
                ? `${isActiveStyles} px-4 py-2 border-l-8  border-red-500`
                : isNotActiveStyles
            }
          >
            <MdDeliveryDining className=" text-2xl" />
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
            <BiListPlus className=" text-2xl" /> {menu && <span>Items</span>}
          </NavLink>
          <NavLink
            to={"/dashboard/newItem"}
            className={({ isActive }) =>
              isActive
                ? `${isActiveStyles} px-4 py-2 border-l-8  border-red-500`
                : isNotActiveStyles
            }
          >
            <BiAddToQueue className=" text-xl" />
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
            <FaUsers className=" text-lg" /> {menu && <span>Users</span>}
          </NavLink>
        </ul>
        {showMenu && menu && (
          <div className="w-full items-center justify-center flex h-225 mt-auto px-2">
            <div className="w-full h-full rounded-md bg-red-400 flex items-center justify-center flex-col gap-3 px-3 py-2">
              <div className="w-12 h-12 borde bg-white rounded-full flex items-center justify-center">
                <p className="text-2xl font-bold text-red-500">?</p>
              </div>
              <p className="text-xl text-primary font-semibold">Help Center</p>
              <p className="text-base text-gray-300 text-center">
                Having trouble in city. Please contact us for more questions
              </p>
              <p className="px-4 py-2 rounded-full bg-primary text-red-400 cursor-pointer">
                Get in touch
              </p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default DashboardLeftSection;
