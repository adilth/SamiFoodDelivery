import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { CreateContainer, Footer, Header } from "./components";
import { AnimatePresence } from "framer-motion";
import getAllFoodData from "./utils/getAllData";
import { Home, Menu } from "./pages";

function App() {
  const fetchData = getAllFoodData();
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <AnimatePresence mode="wait">
      <div className="w-full h-auto flex flex-col bg-primary">
        <Header />
        <main className="mt-12 md:mt-16 px-4 md:px-10 lg:px-14 py-6 w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/createItems" element={<CreateContainer />} />
            <Route path="/menu" element={<Menu />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AnimatePresence>
  );
}

export default App;
