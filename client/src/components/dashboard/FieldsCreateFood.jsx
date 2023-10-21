import { useReducer, useState } from "react";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { categories } from "../../utils/data";
import Loader from "../Loader";
import { storage } from "../../firebase.config";
import { saveItem, updateItem } from "../../utils/firebaseFunc";
import useGetAllFoodData from "../../utils/getAllData";
import { BiMessageSquareEdit } from "@react-icons/all-files/bi/BiMessageSquareEdit";
import { MdCloudUpload } from "@react-icons/all-files/md/MdCloudUpload";
import { MdDelete } from "@react-icons/all-files/md/MdDelete";
import { ImSpoonKnife } from "@react-icons/all-files/im/ImSpoonKnife";
import { MdAttachMoney } from "@react-icons/all-files/md/MdAttachMoney";
import { IoFastFoodOutline } from "@react-icons/all-files/io5/IoFastFoodOutline";

const initialEventData = {
  title: "",
  calories: "",
  desc: "",
  price: "",
  category: null,
};
function FieldsCreateFood({
  setMsg,
  setFields,
  setAlertText,
  isUpdating,
  initialData,
  setOpen,
}) {
  const [imgFood, setImgFood] = useState(
    initialData ? initialData.imgURL : null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [topping, setTopping] = useState(
    initialData ? initialData.vegan : "nonVegan"
  );
  const [event, updateEvent] = useReducer(
    (prev, next) => ({ ...prev, ...next }),
    initialData || initialEventData
  );

  const onOptionChange = (e) => {
    setTopping(e.target.value);
  };
  const fetchData = useGetAllFoodData();
  const uploadImage = (e) => {
    setIsLoading(true);
    const imgFile = e.target.files[0];
    const storageRef = ref(storage, `Images/${Date.now()}-${imgFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imgFile);
    uploadTask.on(
      "state_changed",
      (snapShot) => {
        (snapShot.bytesTransferred / snapShot.totalBytes) * 100;
      },
      (error) => {
        console.error(error);
        handleError("Error deleting image: please try again ");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgFood(downloadURL);
          handleSuccess("Image uploaded Successfully ");
        });
      }
    );
  };
  const handleError = (errorMessage) => {
    setFields(true);
    setMsg(errorMessage);
    setAlertText("danger");
    setTimeout(() => {
      setFields(false);
      setIsLoading(false);
    }, 4000);
  };
  const handleSuccess = (successMsg) => {
    setFields(true);
    setIsLoading(false);
    setMsg(successMsg);
    setAlertText("success");
    setTimeout(() => {
      setFields(false);
      setIsLoading(false);
    }, 4000);
  };
  const deleteImage = () => {
    setIsLoading(true);
    const deleteRef = ref(storage, imgFood);
    deleteObject(deleteRef).then(() => {
      setImgFood(null);
      handleSuccess("Image deleted Successfully");
    });
  };
  const saveDataFood = async () => {
    setIsLoading(true);
    try {
      if (
        !event.title ||
        !event.calories ||
        !imgFood ||
        !event.price ||
        !event.category
      ) {
        handleError("Please fill in all fields before Save ");
        return;
      }
      const dataFood = {
        title: event.title,
        imgURL: imgFood,
        calories: event.calories,
        category: event.category,
        qty: 1,
        price: event.price,
        vegan: topping,
        desc: event.desc,
      };
      if (isUpdating) {
        await updateItem(initialData, { ...dataFood, id: initialData.id });
        setOpen(false);
      } else {
        let newData = { ...dataFood, id: Date.now() };
        // Handle save new data logic using newData...
        saveItem(newData);
      }
      handleSuccess("Data uploading Successfully");
      clearFields();
    } catch (error) {
      console.log(error);
      handleError("Error uploading file: please try again ");
    }
    fetchData();
  };
  const clearFields = () => {
    updateEvent(initialEventData);
    setImgFood(null);
  };
  return (
    <>
      <div className="w-full py-2 border-b border-gray-300 dark:border-gray-700 flex gap-2 items-center">
        <IoFastFoodOutline className="text-xl text-gray-700" />
        <input
          type="text"
          required
          value={event.title}
          onChange={(e) => updateEvent({ title: e.target.value })}
          placeholder="Enter a title"
          className="w-full text-lg bg-transparent lg:font-semibold border-none placeholder:text-gray-400 dark:placeholder:text-gray-600 text-textColor dark:text-darkTextColor"
        />
      </div>
      <div className="w-full py-2 border-b border-gray-300 dark:border-gray-700 flex gap-2 items-center">
        <div className="flex pb-3 mr-4">
          <input
            type="radio"
            required
            name="topping"
            value="vegan"
            id="vegan"
            checked={topping === "vegan"}
            onChange={onOptionChange}
            className="w-4 mr-2  "
          />
          <label
            htmlFor="vegan"
            className="lg:font-semibold text-textColor dark:text-darkTextColor"
          >
            Vegan
          </label>
        </div>
        <div className="flex pb-3">
          <input
            type="radio"
            required
            name="topping"
            value="nonVegan"
            id="nonVegan"
            checked={topping === "nonVegan"}
            onChange={onOptionChange}
            className="w-4 mr-2 lg:font-semibold text-textColor dark:text-darkTextColor"
          />
          <label
            htmlFor="nonVegan"
            className="lg:font-semibold text-textColor dark:text-darkTextColor"
          >
            not Vegan
          </label>
        </div>
      </div>
      <div className="w-full">
        <select
          name="foodCategory"
          id="category"
          className="w-full text-base border-b-2 border-gray-200 dark:border-gray-800 p-2 rounded-md cursor-pointer"
          onChange={(e) => updateEvent({ category: e.target.value })}
        >
          <option value="other" className=" font-bold">
            Select Category
          </option>
          {categories &&
            categories.map((c) => (
              <option
                key={c.id + c.name}
                value={c.name}
                className="text-base border-0 capitalize text-headingColor bg-white dark:text-darkHeadingColor dark:bg-black"
              >
                {c.name}
              </option>
            ))}
        </select>
      </div>
      <div className="group flex items-center justify-center flex-col border-2 border-dotted border-gray-300 dark:border-gray-700 w-full h-[180px] md:h-[280px] curser-pointer rounded-lg">
        {isLoading ? (
          <Loader inside />
        ) : (
          <>
            {!imgFood ? (
              <>
                {" "}
                <label
                  htmlFor="imageFood"
                  className="w-full h-full flex flex-col items-center justify-center cursor-pointer"
                >
                  <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                    <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700 dark:hover:text-gray-400" />
                    <p className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                      Click here to Upload
                    </p>
                  </div>
                  <input
                    id="imageFood"
                    type="file"
                    name="uploadimage"
                    accept="image/*"
                    onChange={uploadImage}
                    className="w-0 h-0"
                  />
                </label>
              </>
            ) : (
              <>
                <div className="relative h-full">
                  <img
                    src={imgFood}
                    alt="uploading images"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    className="absolute bottom-3 -right-5 p-3 rounded-full bg-red-500 text-xl cursor-pointer hover:shadow-md hover:bg-red-700 hover:scale-105 transition-all ease-in-out"
                    onClick={deleteImage}
                  >
                    <MdDelete className="text-white " />
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>
      <div className="e-full flex flex-col md:flex-row items-center gap-3">
        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <ImSpoonKnife className="text-gray-700 dark:text-gray-300 text-2xl" />
          <input
            type="text"
            required
            value={event.calories}
            onChange={(e) => updateEvent({ calories: e.target.value })}
            placeholder="Calories"
            className="w-full text-lg bg-transparent lg:font-semibold border-none placeholder:text-gray-400 text-textColor dark:text-darkTextColor"
          />
        </div>
        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdAttachMoney className="text-gray-700 dark:text-gray-300 text-2xl" />
          <input
            type="number"
            required
            value={event.price}
            onChange={(e) => updateEvent({ price: e.target.value })}
            placeholder="Price"
            className="w-full text-lg bg-transparent lg:font-semibold border-none placeholder:text-gray-400 text-textColor dark:text-darkTextColor"
          />
        </div>
      </div>
      <div className="w-full py-3 border-b border-gray-300 dark:text-gray-300 flex gap-2">
        <BiMessageSquareEdit className="text-gray-700 dark:text-gray-300 text-2xl " />
        <textarea
          type="text"
          required
          value={event.desc}
          onChange={(e) => updateEvent({ desc: e.target.value })}
          placeholder="Enter Description"
          className="w-full text-lg bg-transparent lg:font-semibold border-none placeholder:text-gray-400 text-textColor dark:text-darkTextColor"
        />
      </div>
      <div className="flex w-full items-center mt-2">
        <button
          type="button"
          className="ml-0 md:ml-auto w-full md:w-auto border-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold"
          onClick={saveDataFood}
        >
          {isUpdating ? "Update" : "Save"}
        </button>
      </div>
    </>
  );
}

export default FieldsCreateFood;
