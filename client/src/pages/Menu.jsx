import { useStateValue } from "../context/stateProvider";
import { Search } from "../components";

function Menu() {
  const [{ foodItems }, dispatch] = useStateValue();
  return (
    <section id="foodMenu" className="w-full h-auto flex flex-col items-center">
      <div className="w-full flex flex-col items-center">
        <Search />
      </div>
    </section>
  );
}

export default Menu;
