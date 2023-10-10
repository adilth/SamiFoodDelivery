import { useState, useRef } from "react";
import FieldsCreateFood from "./FieldsCreateFood";
import { motion } from "framer-motion";
import { fadeInOut } from "../../animations/motion";
import useClickOutside from "../../hooks/useClickOutside";

function ModalUpdateItem({ setOpen, item }) {
  const [fields, setFields] = useState(false);
  const [msg, setMsg] = useState(null);
  const [alertText, setAlertText] = useState("danger");
  const modal = useRef();
  useClickOutside(modal, () => {
    setOpen(true);
  });
  return (
    <div
      ref={modal}
      aria-hidden
      className="fixed z-50 bg-slate-50 dark:bg-darkCardBody backdrop-blur-md top-12 left-1 sm:left-8 md:left-2/4 md:-translate-x-1/2  flex  sm:max-w-lg  justify-center items-center w-full shadow-lg"
    >
      <div className="md:px-8 md:py-6 p-4  w-full">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold mb-3">Update Food Item</h2>
          <span
            className=" cursor-pointer font-bold text-xl text-slate-500 dark:text-slate-400"
            onClick={() => setOpen(false)}
          >
            X
          </span>
        </div>
        <hr className="border-1 border-gray-900 my-2" />
        <div>
          {fields && (
            <motion.p
              {...fadeInOut}
              className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${
                alertText === "danger"
                  ? "bg-red-400 text-red-900"
                  : "bg-emerald-400 text-emerald-900"
              }`}
            >
              {msg}
            </motion.p>
          )}
          <FieldsCreateFood
            setMsg={setMsg}
            setFields={setFields}
            setAlertText={setAlertText}
            isUpdating
            initialData={item}
            setOpen={setOpen}
          />
        </div>
      </div>
    </div>
  );
}

export default ModalUpdateItem;
