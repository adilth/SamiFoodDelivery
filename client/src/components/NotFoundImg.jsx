import NotFound from "../assets/img/NotFound.svg";

function NotFoundImg() {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <img src={NotFound} className="h-340" />
      <p className="text-xl text-headingColor dark:text-darkHeadingColor font-semibold my-2">
        Items Not Available
      </p>
    </div>
  );
}

export default NotFoundImg;
