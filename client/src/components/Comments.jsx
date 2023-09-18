import React, { useState } from "react";

function Comments() {
  const [tab, setTab] = useState("desc");
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    msg: "",
  });
  const [contacts, updateContacts] = useState([]);

  const handleChange = (event) => {
    setContactInfo({
      ...contactInfo,
      [event.target.name]: event.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setContactInfo({ name: "", email: "", msg: "" });
    addContact(contactInfo);
    console.log(contactInfo);
  };
  const addContact = (contact) => {
    updateContacts([...contacts, contact]);
  };
  return (
    <div className="">
      <div className="flex gap-5 py-3 mb-5">
        <h6
          className={` text-lg font-semibold pr-5 cursor-pointer${
            tab === "desc" ? " text-orange-700 font-bold" : ""
          }`}
          onClick={() => setTab("desc")}
        >
          Description
        </h6>
        <h6
          className={`text-lg font-semibold cursor-pointer  ${
            tab === "rev" ? "text-orange-700 font-bold" : ""
          }`}
          onClick={() => setTab("rev")}
        >
          Review
        </h6>
      </div>
      <div className="h-[1px] w-full bg-gray-200 mb-4"></div>
      {tab === "desc" ? (
        <div className="tab__content">
          <p>disc</p>
        </div>
      ) : (
        <div className="tab__form mb-4">
          <div>
            {contacts.map((contact) => (
              <div className="card" key={contact.msg}>
                <p className="card-name">{contact.name}</p>
                <p>{contact.email}</p>
                <p>{contact.msg}</p>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <p className="mb-0 font-semibold">Jhon Doe</p>
            <p className="user__email text-ms">jhon1@gmail.com</p>
            <p className="text-textColor text-ms">great product</p>
          </div>

          <div className="review mt-4">
            <p className="user__name mb-0 font-semibold">Jhon Doe</p>
            <p className="user__email text-ms">jhon1@gmail.com</p>
            <p className=" text-textColor text-ms">great product</p>
          </div>

          <div className="review mt-4">
            <p className="user__name mb-0 font-semibold">Jhon Doe</p>
            <p className="user__email text-ms">jhon1@gmail.com</p>
            <p className="text-textColor text-ms">great product</p>
          </div>
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
              className="bg-gradient-to-br from-orange-400 to-orange-500 w-full md:w-auto px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100 text-white"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Comments;
