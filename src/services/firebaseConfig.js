import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCbHEe1e5KEWECyHqA47MYvweCLESVoVm0",
  authDomain: "reddit-clone-609eb.firebaseapp.com",
  projectId: "reddit-clone-609eb",
  storageBucket: "reddit-clone-609eb.appspot.com",
  messagingSenderId: "947876832294",
  appId: "1:947876832294:web:5775319d63c9fdc62572e7",
  measurementId: "G-0PQT1VLH6T",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export const provider = new GoogleAuthProvider();
