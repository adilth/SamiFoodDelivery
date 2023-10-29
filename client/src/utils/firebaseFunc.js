import {
  collection,
  deleteDoc,
  deleteField,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { firestore } from "../firebase.config";

export const updateItem = async (data, newData) => {
  const cityRef = await doc(firestore, "foodItems", String(data.id));
  await updateDoc(cityRef, newData, {
    merge: true,
  });
};
export const deleteItem = async (id) => {
  const cityRef = await doc(firestore, "foodItems", String(id));
  await deleteDoc(cityRef, {
    capital: deleteField(),
  });
};
export const deleteComment = async (id) => {
  const cityRef = await doc(firestore, "comment", String(id));
  await deleteDoc(cityRef, {
    capital: deleteField(),
  });
};
export const deleteActivity = async (id) => {
  const cityRef = await doc(firestore, "activity", String(id));
  await deleteDoc(cityRef, {
    capital: deleteField(),
  });
};

export const updateCartSts = async (id, sts) => {
  try {
    const cityRef = await doc(firestore, "orders", String(id));
    await updateDoc(cityRef, { sts: sts });
  } catch (e) {
    console.error(e);
  }
};

export const listenToOrders = (callback) => {
  const ordersCollection = collection(firestore, "orders");

  const unsubscribe = onSnapshot(ordersCollection, (snapshot) => {
    const orders = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(orders);
  });

  return unsubscribe; // This function allows you to stop listening to updates when needed
};

// get base on id or something
export const getCommentOnId = async (id) => {
  try {
    const snap = await query(
      collection(firestore, "comment"),
      where("productId", "==", String(id))
    );
    const items = await getDocs(snap);
    return items.docs.map((doc) => doc.data());
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
export const getActivity = async () => {
  try {
    const collectionBase = collection(firestore, "activity");
    const queryBase = query(collectionBase, orderBy("id", "desc"));
    const items = await getDocs(queryBase);
    return items.docs.map((doc) => doc.data());
  } catch (error) {
    console.error("Error saving form data:", error);
  }
};
export const getAllOrders = async () => {
  try {
    const collectionBase = await collection(firestore, "orders");
    const queryBase = await query(collectionBase, orderBy("created", "desc"));
    const items = await getDocs(queryBase);
    return items.docs.map((doc) => doc.data());
  } catch (error) {
    console.error("Error saving form data:", error);
    throw error;
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
