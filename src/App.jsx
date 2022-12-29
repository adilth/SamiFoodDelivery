import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { CardShopping, CreateContainer, Footer, Header } from "./components";
import { AnimatePresence } from "framer-motion";
import getAllFoodData from "./utils/getAllData";
import { FoodDetails, Home, Menu } from "./pages";
import { useStateValue } from "./context/stateProvider";

function App() {
  const [{ cartShow }, dispatch] = useStateValue();
  const fetchData = getAllFoodData();
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {}, [cartShow]);
  return (
    <AnimatePresence mode="wait">
      <div className="w-full h-auto flex flex-col bg-primary">
        <Header />
        <main className="mt-12 md:mt-16 px-4 md:px-10 lg:px-14 py-6 w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/createItems" element={<CreateContainer />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/:name" element={<FoodDetails />} />
          </Routes>
        </main>
        <Footer />
        {cartShow && <CardShopping />}
      </div>
    </AnimatePresence>
  );
}

export default App;
