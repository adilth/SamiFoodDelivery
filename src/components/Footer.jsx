import { Link } from "react-router-dom";
import Logo from "../assets/png/logo-color-removebg-preview-min.png";
import { motion } from "framer-motion";
import { FaFacebook, FaInstagram, FaTwitter, FaTiktok } from "react-icons/fa";

function Footer() {
  let year = new Date().getFullYear();
  return (
    <footer id="footer" className="bg-cartBg py-8 md:py-10 px-6 md:px-16 ">
      <footer className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-10 ">
        <div className="self-start">
          <Link to={"/"} className="">
            <img src={Logo} className="w-36 object-cover" alt="logo" />
          </Link>
          <p className=" text-card text-sm pt-3">
            just one click and we there fullfil what you need fast, fresh and
            good quality are our number ONE
          </p>
        </div>
        <nav aria-labelledby="secondary navbar">
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex flex-col item-center text-center gap-4 "
          >
            <li className="text-base text-card underline decoration-red-600 underline-offset-2 hover:text-primary duration-100 transition-all ease-in-out cursor-pointer">
              <Link to={"/"}>Home</Link>
            </li>
            <li className="text-base text-card underline decoration-red-600 underline-offset-2 hover:text-primary duration-100 transition-all ease-in-out cursor-pointer">
              <Link to={"/menu"}> Menu</Link>
            </li>
            <li className="text-base text-card underline decoration-red-600 underline-offset-2 hover:text-primary duration-100 transition-all ease-in-out cursor-pointer">
              About Us
            </li>
            <li className="text-base text-card underline decoration-red-600 underline-offset-2 hover:text-primary duration-100 transition-all ease-in-out cursor-pointer">
              Service
            </li>
          </motion.ul>
        </nav>

        <div className="flex self-start gap-2 text-card pt-1">
          <SocialLink link={"#"} children={<FaFacebook />} />
          <SocialLink link={"#"} children={<FaInstagram />} />
          <SocialLink link={"#"} children={<FaTiktok />} />
          <SocialLink link={"#"} children={<FaTwitter />} />
        </div>
        <div className=" text-card flex flex-col gap-2">
          <h3 className="font-semibold">Contact</h3>
          <p className="text-sm">179 Rue Mohammed el Beqal, Marrakech 40000</p>
          <p className="text-sm">0524432641</p>
          <p className="text-sm">
            find our Restaurant{" "}
            <a
              href="http://www.latrattoriamarrakech.com/"
              className=" font-semibold text-red-600 underline"
            >
              Here
            </a>
          </p>
        </div>
      </footer>
      <p className="pt-6 text-center text-white">
        copyright &copy; {year} SamiFood Reserved
      </p>
    </footer>
  );
}
function SocialLink({ link, children }) {
  return (
    <motion.a
      href={link}
      whileHover={{ scale: 1.1 }}
      className="cursor-pointer border-[1px] p-1 text-2xl rounded-full hover:text-red-600"
    >
      {children}
    </motion.a>
  );
}

export default Footer;
