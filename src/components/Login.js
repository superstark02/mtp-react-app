import { TextField } from "@mui/material";
import "../style/LoginPage.css"
import PrimaryButton from "./utils/PrimaryButton";
import { useForm } from "react-hook-form";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login(){
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const [message, setMessage] = useState("");

    const onSubmit = (data) => {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
          navigate("/")
        })
        .catch((error) => {
          setMessage("Invalid credentials")
        });
    }

    return (
      <div className="login-parent">
        <div className="login">
          <div>Login</div>
          <form onSubmit={handleSubmit(onSubmit)} >
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
            <div className="text-sm text-red-500" >
              {message}
            </div>
            <div>
              <PrimaryButton
                variant="contained"
                disableElevation
                content={"Login"}
              />
            </div>
          </form>
          <div className="f-p">FORGOT PASSWORD</div>
        </div>
      </div>
    );
}