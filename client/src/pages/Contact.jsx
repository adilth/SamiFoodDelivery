import { useState } from "react";

function Contact() {
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    msg: "",
  });
  const handleChange = (event) => {
    setContactInfo({
      ...contactInfo,
      [event.target.name]: event.target.value,
    });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    setContactInfo({ name: "", email: "", msg: "" });
  };
  return (
    <div className="my-5">
      <h2 className="text-2xl font-semibold capitalize relative text-textColor dark:text-darkHeadingColor before:absolute before:rounded-lg before:content before:w-16 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100 mr-auto mb-6">
        Contact Us
      </h2>
      <p className="text-center text-headingColor dark:text-darkHeadingColor pt-3">
        write us what the issue you face or want to add new thing or feather{" "}
      </p>
      <div className="flex justify-center">
        <form
          className="w-[90%] md:w-[75%] border my-5 m-auto border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center gap-4"
          onSubmit={submitHandler}
        >
          <div className="w-full border-b-2 border-solid border-stone-300 bg-transparent px-5 py-1">
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              onChange={handleChange}
              className="w-full text-lg bg-transparent lg:font-semibold border-none placeholder:text-gray-400 text-textColor outline-offset-4 outline-slate-400"
              value={contactInfo.name}
              required
            />
          </div>

          <div className="w-full border-b-2 border-solid border-stone-300 bg-transparent px-5 py-1">
            <input
              type="text"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              className="w-full text-lg bg-transparent lg:font-semibold border-none placeholder:text-gray-400 text-textColor outline-offset-4 outline-slate-400"
              value={contactInfo.email}
              required
            />
          </div>

          <div className="w-full border-b-2 border-solid border-stone-300 bg-transparent px-5 py-1">
            <textarea
              rows={5}
              type="text"
              name="msg"
              placeholder="Write your review"
              onChange={handleChange}
              value={contactInfo.msg}
              className="w-full text-lg bg-transparent lg:font-semibold border-none placeholder:text-gray-400 text-textColor outline-offset-8 outline-slate-400"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-gradient-to-br from-orange-700 to-orange-600 w-full md:w-auto px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100 text-white"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
