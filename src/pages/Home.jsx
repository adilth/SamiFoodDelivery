import { useEffect } from "react";
import {
  CardShopping,
  FoodSection,
  Hero,
  MenuSection,
  Services,
} from "../components";
import { useStateValue } from "../context/stateProvider";

function Home() {
  const [{ cartShow }, dispatch] = useStateValue();
  useEffect(() => {}, [cartShow]);
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      <Hero />
      <FoodSection />
      <Services />
      <MenuSection />
      {cartShow && <CardShopping />}
    </div>
  );
}

export default Home;
