import { Suspense, lazy } from "react";
import { FoodSection, Hero, Loader, Services } from "../components";
const MenuSection = lazy(() => import("../components/MenuSection"));
function Home() {
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      <Hero />
      <FoodSection />
      <Services />
      <Suspense fallback={<Loader />}>
        <MenuSection />
      </Suspense>
    </div>
  );
}

export default Home;
