import React from "react";
import { CreateContainer } from "../components";

function CreateCont() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="w-[90%] md:w-[75%] border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-4">
        <CreateContainer />
      </div>
    </div>
  );
}

export default CreateCont;
