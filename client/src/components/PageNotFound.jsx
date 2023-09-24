import Header from "./Header";
import EmptyCart from "../assets/img/emptyCart.svg";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <>
      <Header />
      <div className="w-full h-screen flex justify-center content-center items-center ">
        <div className="flex">
          <div>
            <h1 className=" text-cartNumBg text-9xl ">404 </h1>
            <p className="text-lg text-gray-600 mb-6">page not found</p>
            <Link
              to="/"
              className="text-lg border border-cartNumBg p-3 rounded-lg text-cartNumBg font-bold"
            >
              GO TO Main Page
            </Link>
          </div>
          <img src={EmptyCart} className="w-300" alt="add more item image" />
        </div>
      </div>
    </>
  );
}

export default PageNotFound;
