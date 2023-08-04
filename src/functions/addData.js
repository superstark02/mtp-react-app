import { doc, setDoc } from "firebase/firestore"; 
import {db} from "../firebase"

export function addDataDoc(data){
    return new Promise((resolve, reject) => {
      const userRef = doc(db, "users", data.email);
      setDoc(
        userRef,
        {
          name: data.name,
          email: data.email,
          image_url: data.image_url,
        },
        { merge: true }
      ).then(() => {
        resolve("User added");
      });
    });
}