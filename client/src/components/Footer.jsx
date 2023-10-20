import { Link } from "react-router-dom";
import Logo from "../assets/png/logo-color-removebg-preview-min.png";
import { motion } from "framer-motion";
import { FaFacebook } from "@react-icons/all-files/fa/FaFacebook";
import { FaInstagram } from "@react-icons/all-files/fa/FaInstagram";
import { FaTwitter } from "@react-icons/all-files/fa/FaTwitter";
import { IoLogoTiktok } from "@react-icons/all-files/io5/IoLogoTiktok";
import { fadeInOutWithTransition } from "../animations/motion";

function Footer() {
  let year = new Date().getFullYear();
  return (
    <footer
      id="footer"
      className=" bg-[#0f3038] text-white p-4 py-8 md:py-10 sm:px-6 md:px-16 "
    >
      <footer className="grid grid-cols-menu_auto_fit md:grid-cols-4 gap-3 md:gap-10 ">
        <div className="self-start w-full h-full">
          <Link to={"/"} className="">
            <img
              src={Logo}
              className="w-36 h-12 object-cover invert brightness-0"
              alt="logo"
            />
          </Link>
          <p className=" text-sm pt-3">
            just one click and we there fullfil what you need fast, fresh and
            good quality are our number ONE
          </p>
        </div>
        <nav aria-labelledby="secondary navbar">
          <motion.ul
            {...fadeInOutWithTransition}
            className="flex flex-row sm:flex-col item-center text-center gap-4 "
          >
            <li className="text-base underline decoration-red-600 underline-offset-4 hover:text-primary duration-100 transition-all ease-in-out cursor-pointer">
              <Link to={"/"}>Home</Link>
            </li>
            <li className="text-base underline decoration-red-600 underline-offset-4 hover:text-primary duration-100 transition-all ease-in-out cursor-pointer">
              <Link to={"/menu"}> Menu</Link>
            </li>
            <li className="text-base  underline decoration-red-600 underline-offset-4 hover:text-primary duration-100 transition-all ease-in-out cursor-pointer">
              <Link to={"/aboutus"}> About Us</Link>
            </li>
            <li className="text-base  underline decoration-red-600 underline-offset-4 hover:text-primary duration-100 transition-all ease-in-out cursor-pointer">
              Service
            </li>
          </motion.ul>
        </nav>

        <div className="flex flex-wrap self-center sm:self-start gap-2 pt-1">
          <SocialLink link={"#"}>
            <FaFacebook />
          </SocialLink>
          <SocialLink link={"#"}>
            <FaInstagram />
          </SocialLink>
          <SocialLink link={"#"}>
            <IoLogoTiktok />
          </SocialLink>
          <SocialLink link={"#"}>
            <FaTwitter />
          </SocialLink>
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
              Latrattoria Restaurant
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
      aria-label="social media link"
      whileHover={{ scale: 1.1 }}
      className="cursor-pointer border-[1px] p-1 text-2xl rounded-full hover:text-red-600"
    >
      {children}
    </motion.a>
  );
}

export default Footer;
