import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Suspense, lazy } from "react";
import { CardShopping, Header, Loader, PageNotFound } from "../components";
import { useStateValue } from "../context/StateProvider";

const Home = lazy(() => import("./Home"));
const Menu = lazy(() => import("./Menu"));
const FoodDetails = lazy(() => import("./FoodDetails"));
const UsersOrder = lazy(() => import("./UserOrder"));
const AboutUs = lazy(() => import("./AboutUs"));
const Contact = lazy(() => import("./Contact.jsx"));
const Footer = lazy(() => import("../components/Footer"));

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
            exact
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
          <Route
            path="/contact"
            element={
              <Suspense fallback={<Loader />}>
                <Contact />
              </Suspense>
            }
          />
          <Route path="/404" element={<PageNotFound />} />
          <Route path="/*" element={<Navigate to="/404" />} />
        </Routes>
      </main>
      <Suspense fallback={<Loader />}>
        <Footer />
      </Suspense>
      {cartShow && <CardShopping />}
    </>
  );
}

export default HomeRoute;
