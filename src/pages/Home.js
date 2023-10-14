import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import "../style/Home.css";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import Graphql from "../functions/grphql";

function Home() {
  const [userLoggedIn, setUserLoggedin] = useState("Please wait...");
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [graphqlData, setGraphqlData] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserLoggedin(user.email);

        const docRef = doc(db, "users", user.email);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } else {
        setUserLoggedin("Please Login/Signup");
      }
    });
  });

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="welcome-parent">
        <div>
          <div className="welcome">Welcome! {userLoggedIn}</div>
          {userLoggedIn && userData ? (
            <div className="text-center mt-10">
              <div>
                Name: {userData.name}
                <div className="flex justify-center">
                  <img
                    alt="pp"
                    className="profile-photo"
                    src={userData.image_url}
                  />
                </div>
              </div>
              <div className="mt-20" onClick={handleLogout}>
                Logout
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div>
          {graphqlData &&
            graphqlData.map((item) => {
              return (
                <div>
                  <div>{item.name}</div>
                  <div>
                    <img src={item.imageUrl} alt="char" />
                  </div>
                  <div>{item.id}</div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Home;
