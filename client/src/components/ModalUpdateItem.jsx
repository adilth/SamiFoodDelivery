import { useState } from "react";
import FieldsCreateFood from "./FieldsCreateFood";
import { motion } from "framer-motion";
import { fadeInOut } from "../animations/motion";
function ModalUpdateItem({ setOpen, item }) {
  const [fields, setFields] = useState(false);
  const [msg, setMsg] = useState(null);
  const [alertText, setAlertText] = useState("danger");
  return (
    <div className="fixed z-50 bg-slate-100 backdrop-blur-md top-1/6 left-1/3 flex justify-center items-center">
      <div className="p-10">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold mb-3">Update Food Item</h2>
          <span
            className=" cursor-pointer font-bold text-xl text-slate-500"
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
            isUpdating={true}
            initialData={item}
            setOpen={setOpen}
          />
        </div>
      </div>
    </div>
  );
}

export default ModalUpdateItem;
