import { Route, Routes, useLocation } from "react-router-dom";
import { Suspense, lazy } from "react";
import Home from "./Home";
// import Menu from "./Menu";
const Menu = lazy(() => import("./Menu"));
import FoodDetails from "./FoodDetails";
import { CardShopping, Footer, Header, Loader } from "../components";
import { useStateValue } from "../context/stateProvider";

function HomeRoute() {
  const location = useLocation();
  const [{ cartShow, foodItem }, dispatch] = useStateValue();
  return (
    <>
      <Header />
      <main className="mt-12 md:mt-16 px-4 md:px-10 lg:px-14 py-6 w-full">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route
            path="/menu"
            element={
              <Suspense fallback={<Loader />}>
                <Menu />
              </Suspense>
            }
          />
          <Route path="/food/:nameId" element={<FoodDetails />} />
        </Routes>
      </main>
      <Footer />
      {cartShow && <CardShopping />}
    </>
  );
}

export default HomeRoute;
