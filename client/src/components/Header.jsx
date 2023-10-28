import { useRef, useState } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Link } from "react-router-dom";
import { app } from "../firebase.config";
import Logo from "../assets/png/logo-no-background.webp";
import { useStateValue } from "../context/StateProvider";
import { actionTypesSet } from "../context/reducer";
import { useShowCard } from "../utils/getAllData";
import { saveUser } from "../utils/firebaseFunc";
import useTheme from "../hooks/useTheme";
import { useMediaQuery } from "react-responsive";
import useClickOutside from "../hooks/useClickOutside";
import { useFoodValue } from "../context/FoodProvider";
import { DesktopNav, MobileNav } from "./NavBar";

const Header = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  let mobileNav = useMediaQuery({ query: "(max-width: 620px)" });
  const [{ user }, dispatch] = useStateValue();
  const [{ foodCart }] = useFoodValue();
  const [isMenu, setMenu] = useState(false);
  const [theme, setTheme] = useTheme();
  const sidebarRef = useRef();
  useClickOutside(sidebarRef, () => {
    setMenu(false);
  });

  function handleDarkAndLight() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }
  const login = async () => {
    if (!user) {
      const {
        user: { providerData },
      } = await signInWithPopup(firebaseAuth, provider);
      dispatch({
        type: actionTypesSet.SET_USER,
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
      type: actionTypesSet.SET_USER,
      user: null,
    });
  };
  const showCart = useShowCard();
  return (
    <header
      className="fixed bg-primary dark:bg-darkPrimary z-50 w-full p-3.5 md:px-10 lg:px-12 drop-shadow-lg"
      onMouseEnter={() => setMenu(false)}
    >
      {/* screen */}
      {!mobileNav ? (
        <div className=" sm:flex w-full h-full justify-between">
          <Link to={"/"} className="flex items-center gap-2 ">
            <img
              src={Logo}
              width="32"
              height="13"
              className="w-32 aspect-[16/5] md:w-32 object-contain dark:invert dark:brightness-0"
              alt="logo"
            />
          </Link>
          <DesktopNav
            user={user}
            theme={theme}
            handleDarkAndLight={handleDarkAndLight}
            showCart={showCart}
            login={login}
            logOut={logOut}
            setMenu={setMenu}
            sidebarRef={sidebarRef}
            foodCart={foodCart}
            isMenu={isMenu}
          />
        </div>
      ) : (
        <div
          className="flex justify-between items-center w-full h-full"
          onMouseLeave={() => setMenu(false)}
        >
          <Link to={"/"} className="flex items-center gap-2">
            <img
              src={Logo}
              width="32"
              height="13"
              className="w-36 aspect-[16/5] object-contain dark:invert dark:brightness-0"
              alt="logo"
            />
          </Link>
          <MobileNav
            user={user}
            theme={theme}
            handleDarkAndLight={handleDarkAndLight}
            showCart={showCart}
            login={login}
            logOut={logOut}
            setMenu={setMenu}
            sidebarRef={sidebarRef}
            foodCart={foodCart}
            isMenu={isMenu}
          />
        </div>
      )}
    </header>
  );
};

export default Header;
