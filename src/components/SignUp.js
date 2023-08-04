import { TextField} from "@mui/material";
import "../style/LoginPage.css"
import PrimaryButton from "./utils/PrimaryButton";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDataDoc } from "../functions/addData";
import {ref as createStorageRef,uploadBytesResumable} from "firebase/storage";

export default function SignUp(){
    const { register, handleSubmit } = useForm();
    const [message, setMessage] = useState("");
    const [imageUrl, setImageUrl] = useState(null);
    const navigate = useNavigate();

    const onSubmit = (data) => {
        setMessage("")
        console.log(data)
        if(data.password === data.confirm_password){
            setMessage("Please wait")
            // add user
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                const storage = getStorage();
                const storageRef = ref(storage, 'images/' + data.name + ".jpg");

                //file upload
                if(!data.image){
                  setMessage("Please select an image");
                }
                else{
                  const storageRef = createStorageRef(storage, `/files/${data.name}`);
                  const uploadTask = uploadBytesResumable(storageRef, data.image[0]);
                  uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        const percent = Math.round(
                            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        );
                    },
                    (err) => console.log(err),
                    () => {
                        // download url
                        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                            console.log("File uploaded",url);
                            setImageUrl(url);
                            data.image_url = url
                            console.log(data)
                            addDataDoc(data).then((result)=>{
                              console.log(result);
                              setMessage("User data added")
                              navigate('/')
                            });
                        });
                    }
                  ); 
                }
            })
            .catch((error) => {
                setMessage("User alrady exists")
            });
        }
        else{
            setMessage("Wrong Password")
        }
    }

    return (
      <div className="login-parent">
        <div className="login">
          <div>Sign Up</div>
          <form onSubmit={handleSubmit(onSubmit)} >
            <div className="login-input-cnt">
              <TextField
                className="login-input"
                variant="standard"
                placeholder="Name"
                type="text"
                {...register("name")}
              />
            </div>
            <div className="login-input-cnt">
              <TextField
                className="login-input"
                variant="standard"
                placeholder="Email"
                type="email"
                {...register("email")}
              />
            </div>
            <div className="login-input-cnt">
              <TextField
                className="login-input"
                variant="standard"
                placeholder="Password"
                type="password"
                {...register("password")}
              />
            </div>
            <div className="login-input-cnt">
              <TextField
                className="login-input"
                variant="standard"
                placeholder="Confirm Password"
                type="password"
                {...register("confirm_password")}
              />
            </div>
            <div>
              <input className="login-input text-sm" type="file" {...register("image")}/>
            </div>
            <div>
              {
                imageUrl?(
                  <img alt="photo" src={imageUrl} />
                ):(
                  <div></div>
                )
              }
            </div>
            <div className="text-sm text-red-500">
                {message}
            </div>
            <div>
              <PrimaryButton
                variant="contained"
                content={"Sign Up"}
                disableElevation
              />
            </div>
          </form>
        </div>
      </div>
    );
}