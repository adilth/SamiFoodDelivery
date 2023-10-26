import Rating from "./Rating";

function RatingReviews({ comments, size }) {
  function ratingReviews() {
    const rating = (
      comments?.reduce((acc, comment) => acc + Number(comment.rating), 0) /
      comments.length
    ).toFixed(1);
    return isNaN(rating) ? 0 : rating;
  }
  return (
    <div className="flex xs:items-center flex-col items-start sm:flex-row">
      <div className="flex">
        <p className="text-sm font-semibold">
          {ratingReviews() === 0 ? "" : ratingReviews()}
        </p>
        <Rating rating={ratingReviews()} size={size} readOnly />
      </div>
      <p className=" text-xs">({comments.length} reviews)</p>
    </div>
  );
}

export default RatingReviews;
