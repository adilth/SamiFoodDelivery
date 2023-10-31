import { Suspense, lazy } from "react";
import { FoodSection, Hero, Loader } from "../components";
const MenuSection = lazy(() => import("../components/MenuSection"));
const Services = lazy(() => import("../components/Services"));
function Home() {
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      <Hero />
      <FoodSection />
      <Suspense fallback={<Loader />}>
        <Services />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <MenuSection />
      </Suspense>
    </div>
  );
}

export default Home;
