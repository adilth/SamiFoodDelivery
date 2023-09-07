import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { firestore } from "../firebase.config";
import {} from "firebase/auth";
export const saveItem = async (data) => {
  const docItems = doc(firestore, "foodItems", `${Date.now()}`);
  await setDoc(docItems, data, {
    merge: true,
  });
};
export const saveForm = async (data) => {
  try {
    const docItems = doc(firestore, "dataForm", `${Date.now()}`);
    await setDoc(docItems, data, {
      merge: true,
    });
  } catch (error) {
    console.error("Error saving item:", error);
  }
};

//fetch all food items
export const fetchAllFood = async () => {
  try {
    const collectionBase = collection(firestore, "foodItems");
    const queryBase = query(collectionBase, orderBy("id", "desc"));
    const items = await getDocs(queryBase);
    return items.docs.map((doc) => doc.data());
  } catch (error) {
    console.error("Error saving form data:", error);
  }
};

export const saveUser = async (user) => {
  try {
    const usersCollection = collection(firestore, "users");
    const userQuery = query(usersCollection, where("uid", "==", user.uid));
    const userDocs = await getDocs(userQuery);

    // Check if a user with the same UID already exists
    if (userDocs.size === 0) {
      // User doesn't exist; add the new user
      const newUserRef = doc(usersCollection);
      await setDoc(newUserRef, user);
      console.log("User data saved successfully.");
    } else {
      console.log("User already exists, skipping.");
    }
  } catch (error) {
    console.error("Error saving user data:", error);
  }
};

export const getAllUsers = async () => {
  try {
    const usersCollection = collection(firestore, "users");
    const querySnapshot = await getDocs(usersCollection);
    return querySnapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw error; // Rethrow the error to handle it in your component or catch it as needed.
  }
};
