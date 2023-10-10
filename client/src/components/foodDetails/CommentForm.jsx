import React from "react";
import Rating from "./Rating";

function CommentForm({
  submitHandler,
  addRating,
  handleRatingChange,
  messageRef,
}) {
  return (
    <form
      className=" w-full sm:w-[90%] md:w-[75%] border my-5 m-auto border-gray-300 dark:text-gray-700 rounded-lg p-3 md:p-6 flex flex-col items-center justify-center gap-4"
      onSubmit={submitHandler}
    >
      <div className="w-full border-b-2 border-solid border-stone-300 dark:text-gray-700 bg-transparent px-5 py-1">
        <Rating
          rating={addRating}
          onRatingChange={handleRatingChange}
          size={"h-9 w-9"}
        />
      </div>
      <div className="w-full border-b-2 border-solid border-stone-300 dark:text-gray-700 bg-transparent px-5 py-1">
        <textarea
          rows={5}
          type="text"
          name="msg"
          maxLength={65}
          minLength={4}
          placeholder="Write your review"
          ref={messageRef}
          className="w-full text-lg bg-transparent lg:font-semibold border-none placeholder:text-gray-400 dark:placeholder:text-gray-600 text-textColor dark:text-darkTextColor outline-offset-8 outline-slate-400"
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
  );
}

export default CommentForm;
