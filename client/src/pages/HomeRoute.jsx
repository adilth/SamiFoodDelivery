import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Suspense, lazy } from "react";
const Home = lazy(() => import("./Home"));
const Menu = lazy(() => import("./Menu"));
const FoodDetails = lazy(() => import("./FoodDetails"));
import {
  CardShopping,
  Footer,
  Header,
  Loader,
  PageNotFound,
} from "../components";
import { useStateValue } from "../context/StateProvider";
const UsersOrder = lazy(() => import("./UserOrder"));
const AboutUs = lazy(() => import("./AboutUs"));

function HomeRoute() {
  const location = useLocation();
  const [{ cartShow, user }] = useStateValue();
  return (
    <>
      <Header />
      <main className="mt-12 md:mt-16 px-4 md:px-10 lg:px-14 py-6 w-full dark:bg-darkPrimary">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <Suspense fallback={<Loader />}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="/menu"
            element={
              <Suspense fallback={<Loader />}>
                <Menu />
              </Suspense>
            }
          />
          <Route
            path="/food/:nameId"
            element={
              <Suspense fallback={<Loader />}>
                <FoodDetails />
              </Suspense>
            }
          />
          <Route
            path="/aboutUs"
            element={
              <Suspense fallback={<Loader />}>
                <AboutUs />
              </Suspense>
            }
          />
          <Route
            path="/userOrder"
            element={
              <Suspense fallback={<Loader />}>
                {user ? <UsersOrder /> : <Navigate to="/" replace />}
              </Suspense>
            }
          />
          <Route path="/404" element={<PageNotFound />} />
          <Route path="/*" element={<Navigate to="/404" />} />
        </Routes>
      </main>
      <Footer />
      {cartShow && <CardShopping />}
    </>
  );
}

export default HomeRoute;
