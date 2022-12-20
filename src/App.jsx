import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { CreateContainer, Header, MainContainer } from "./components";
import { AnimatePresence } from "framer-motion";
function App() {
  const [count, setCount] = useState(0);

  return (
    <AnimatePresence mode="wait">
      <div className="w-full h-auto flex flex-col bg-primary">
        <Header />
        <main className="mt-12 md:mt-16 px-4 md:px-12 lg:px-16  py-6 w-full">
          <Routes>
            <Route path="/" element={<MainContainer />} />
            <Route path="/createItems" element={<CreateContainer />} />
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
}

export default App;
