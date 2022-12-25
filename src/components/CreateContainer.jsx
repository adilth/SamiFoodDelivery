import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import FieldsCreateFood from "./FieldsCreateFood";

const CreateContainer = () => {
  const [fields, setFields] = useState(false);
  const [msg, setMsg] = useState(null);
  const [alertText, setAlertText] = useState("danger");
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="w-[90%] md:w-[75%] border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-4">
        {fields && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
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
        />
      </div>
    </div>
  );
};

export default CreateContainer;
