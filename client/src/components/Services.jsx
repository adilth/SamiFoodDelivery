import S1 from "../assets/png/s1.png";
import S2 from "../assets/png/s2.png";
import S3 from "../assets/png/s3.png";
function Services() {
  return (
    <section className="w-full my-4" id="services">
      <h2 className="text-2xl font-semibold mb-6 capitalize relative text-headingColor before:absolute before:rounded-lg before:content before:w-16 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100 mr-auto">
        What We Serve
      </h2>
      <div className="w-full flex items-center justify-center gap-8 flex-col sm:flex-row">
        <CardService
          img={S1}
          title="person hold phone to order"
          heading={"Easy To Order"}
          text={"You only need few step in food ordering"}
        />
        <CardService
          img={S2}
          title="person hold phone to order"
          heading={"Fast Delivery"}
          text={"Our Delivery is always on time even faster"}
        />
        <CardService
          img={S3}
          title="person hold phone to order"
          heading={"Good Quality"}
          text={"not only care to be faster, our quality is our number one "}
        />
      </div>
    </section>
  );
}

function CardService({ img, title, text, heading }) {
  return (
    <div className="w-full flex flex-col justify-center items-center text-center p-8">
      <img
        src={img}
        alt={title}
        className="lg:w-[65%] md:w-[80%]  h-[200px] bg-cover"
      />
      <h4 className="py-4 font-bold">{heading}</h4>
      <p className=" text-textColor text-[0.9rem]">{text}</p>
    </div>
  );
}
export default Services;
