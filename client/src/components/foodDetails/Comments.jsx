import { useRef, useState } from "react";
import { useStateValue } from "../../context/StateProvider";
import { deleteComment } from "../../utils/firebaseFunc";
import { saveCommentToFirebase, activeProduct } from "../../utils/firebasePost";

import { useAlertState } from "../../context/alertProvider";
import { alertActionTypes } from "../../context/alertReducer";
import CommentsProduct from "./CommentsProduct";
import CommentForm from "./CommentForm";
function Comments({ dishFood, comments, setComments }) {
  const [{ user }] = useStateValue();
  const { setAlert } = useAlertState();
  const [addRating, setAddRating] = useState(0);
  const [tab, setTab] = useState("desc");
  const messageRef = useRef(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!user) {
      handleAlert("Please log in first to send a comment");
      return;
    }
    const messageValue = messageRef.current.value.trim(); // Trim leading and trailing whitespace

    if (!messageValue || addRating === 0) {
      handleAlert("Please fill in all the required information");
      return;
    }
    try {
      const newComment = {
        id: Date.now(),
        userId: user.uid,
        productId: dishFood.id,
        userImg: user.photoURL,
        name: user.displayName,
        email: user.email,
        rating: addRating,
        msg: messageRef.current.value,
      };
      saveCommentToFirebase(newComment);
      await activeProduct({
        id: Date.now(),
        text: `${user?.displayName} add rating to ${dishFood?.title}`,
        userName: user?.displayName,
        productName: dishFood?.title,
        item: dishFood,
        time: new Date(),
      });
      setComments([...comments, newComment]);
      handleAlert("The comment was successfully added", "success");
      // Clear the input field and rating
      messageRef.current.value = "";
      setAddRating(0);
    } catch (error) {
      console.error("Error saving comment:", error);
      handleAlert("An error occurred while saving the comment", "danger");
    }
  };
  const handleAlert = (message, type = "danger") => {
    setAlert(alertActionTypes[`SET_${type.toUpperCase()}`], message);
    setTimeout(() => {
      setAlert(alertActionTypes.SET_ALERT_NULL, "");
    }, 3000);
  };
  const handleRatingChange = (newRating) => {
    setAddRating(newRating);
  };
  async function deleteUserComment(id) {
    try {
      await deleteComment(id);
      const updatedComments = comments.filter((comment) => comment.id !== id);
      handleAlert("The comment has been deleted", "success");
      setComments(updatedComments); // Update the state with the new array
    } catch (err) {
      console.error("Error deleting comment:", err);
    }
  }

  return (
    <div className="mb-6">
      <div className="flex gap-5 py-3 mb-4">
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
      <div className="h-[1px] w-full bg-gray-200 dark:bg-gray-400 mb-3" />
      {tab === "desc" ? (
        <div
          className="text-base text-zinc-700 dark:text-zinc-300 md:w-[65ch]"
          key={dishFood.id}
        >
          <p>{dishFood.desc}</p>
        </div>
      ) : (
        <div className="tab__form mb-4">
          <div className="mb-6">
            {comments.length ? (
              comments?.map((contact) => (
                <CommentsProduct
                  key={contact.id}
                  comment={contact}
                  deleteUserComment={deleteUserComment}
                />
              ))
            ) : (
              <div className=" text-center text-lg p-3">
                write a comment to tell us what you think about this food
              </div>
            )}
          </div>
          <CommentForm
            handleRatingChange={handleRatingChange}
            submitHandler={submitHandler}
            messageRef={messageRef}
            addRating={addRating}
          />
        </div>
      )}
    </div>
  );
}

export default Comments;
