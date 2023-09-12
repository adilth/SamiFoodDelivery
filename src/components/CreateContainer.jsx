import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import FieldsCreateFood from "./FieldsCreateFood";
import { fadeInOut } from "../animations/motion";

const CreateContainer = () => {
  const [fields, setFields] = useState(false);
  const [msg, setMsg] = useState(null);
  const [alertText, setAlertText] = useState("danger");
  return (
    <div className="w-full h-full flex justify-center pt-6">
      <div className="w-[90%] md:w-[75%] border border-gray-300 rounded-lg p-4 flex flex-col  gap-4">
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
          isUpdating={false}
        />
      </div>
    </div>
  );
};

export default CreateContainer;
