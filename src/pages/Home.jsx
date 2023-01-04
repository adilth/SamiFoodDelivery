import { FoodSection, Hero, MenuSection, Services } from "../components";

function Home() {
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      <Hero />
      <FoodSection />
      <Services />
      <MenuSection />
    </div>
  );
}

export default Home;
