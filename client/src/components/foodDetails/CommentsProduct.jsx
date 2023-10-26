import { buttonTapSoft } from "../../animations/motion";
import { motion } from "framer-motion";
import Rating from "./Rating";

function CommentsProduct({ comment, deleteUserComment }) {
  return (
    <div
      className="mb-1 bg-zinc-200 dark:bg-darkCardOverlay dark:border dark:border-blue-900 p-3 md:w-[60%] "
      key={comment.id}
    >
      <div className="flex gap-2 flex-col xs:flex-row">
        <p className=" w-10 rounded-full">
          <img
            src={comment.userImg}
            alt="user image"
            className="rounded-full"
          />
        </p>
        <div className="w-full flex justify-between">
          <div>
            <p className="font-semibold text-sm text-gray-700 dark:text-zinc-300">
              {comment.name}
            </p>
            <div className=" text-gray-600 dark:text-gray-300 text-xs w-13">
              <Rating rating={comment.rating} size={"h-4 w-4"} readOnly />
            </div>
          </div>
          <motion.div
            {...buttonTapSoft}
            className="p-0 text-red-500 text-sm font-bold cursor-pointer"
            onClick={() => deleteUserComment(comment.id)}
          >
            Delete
          </motion.div>
        </div>
      </div>
      <p className="py-2">{comment.msg}</p>
    </div>
  );
}

export default CommentsProduct;
