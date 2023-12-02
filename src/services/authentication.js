import { signInWithRedirect, signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { provider } from "./firebaseConfig";

export const signInWithGoogle = async () => {
  try {
    await signInWithRedirect(auth, provider);
  } catch (error) {
    console.log(error);
  }
};

export const signOutAcc = () => {
  signOut(auth)
    .then(() => {
      localStorage.clear();
    })
    .catch((error) => {
      console.log(error);
    });
};
