import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { firestore } from "../firebase.config";

export const saveItem = async (data) => {
  const docItems = doc(firestore, "foodItems", `${Date.now()}`);
  await setDoc(docItems, data, {
    merge: true,
  });
};

//fetch all food items
export const fetchAllFood = async () => {
  const collectionBase = collection(firestore, "foodItems");
  const queryBase = query(collectionBase, orderBy("id", "desc"));
  const items = await getDocs(queryBase);
  return items.docs.map((doc) => doc.data());
};
