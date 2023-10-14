import {db} from "../firebase"

export function addDataDoc(data){
    return new Promise((resolve, reject) => {
        db.collection("users").doc(data.email).add({
            name: "Tokyo",
            country: "Japan"
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
    });
}