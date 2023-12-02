import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../services/firebaseConfig";

export const fetchCollection = async (data, currentUser, communityName) => {
  let result = data;
  const q = query(
    collection(db, "" + communityName),
    where("userId", "!=", "")
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const isObjectInArray = result.some(
      (item) => item.name === doc.data().name
    );
    if (!isObjectInArray) result = [...result, doc.data()];
  });
  return result;
};
