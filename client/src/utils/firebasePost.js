import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { firestore } from "../firebase.config";

// save food item to the database that named foodItems
export const saveItem = async (data) => {
  const docItems = doc(firestore, "foodItems", `${Date.now()}`);
  await setDoc(docItems, data, {
    merge: true,
  });
};

//save activities of user like add to cart or buying items and add comments
export const activeProduct = async (data) => {
  const docItems = doc(firestore, "activity", `${Date.now()}`);
  await setDoc(docItems, data, {
    merge: true,
  });
};

// Create a comment to database for the user
export const saveCommentToFirebase = async (data) => {
  const docItems = doc(firestore, "comment", `${Date.now()}`);
  await setDoc(docItems, data, {
    merge: true,
  });
};

//save form
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

//take use that login and made a data for it
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
    } else {
      return;
    }
  } catch (error) {
    console.error("Error saving user data:", error);
  }
};
