import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7SLEhHqDX3MVtAjy47ORNaSZTkUitW80",
  authDomain: "training-program-d886b.firebaseapp.com",
  projectId: "training-program-d886b",
  storageBucket: "training-program-d886b.appspot.com",
  messagingSenderId: "318657377662",
  appId: "1:318657377662:web:9feaa5d129078fd4baaf2f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);