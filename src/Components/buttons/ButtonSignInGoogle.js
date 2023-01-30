import { signInWithPopup } from "firebase/auth";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthenContext";
import { auth, db, providerGoogle } from "../../Firebase/firebaseConfig";

const ButtonSignInGoogle = () => {
  const navigate = useNavigate();
  const { userAccount } = useAuth();

  const handleSignInWithGoogle = () => {
    signInWithPopup(auth, providerGoogle).then(async (data) => {
      const colRef = collection(db, "users");
      const q = query(colRef, where("email", "==", data.user.email));
      onSnapshot(q, async (snapshot) => {
        if (snapshot.docs.length === 0) {
          // console.log("Add new user");
          await addDoc(colRef, {
            email: data.user.email,
            name: data.user.displayName,
            password: "",
          });
        }
      });
    });
  };

  useEffect(() => {
    if (userAccount?.email) {
      navigate("/");
    }
  }, [navigate, userAccount]);

  return (
    <div className="md:w-[395px] sm:w-[350px] xs:w-[330px]  md:h-[80px] xs:h-[60px] ">
      <button
        onClick={handleSignInWithGoogle}
        className="w-full h-full rounded-[15px] bg-signUpbg border border-grayDarkText text-mainColor font-semibold   lg:leading-[33px] lg:text-[22px] md:mt-10  md:leading-[30px] md:text-[20px] xs:mt-7 xs:text-[18px] xs:leading-[28px]"
      >
        <div className="flex items-center justify-center">
          <div className="w-[35px] h-[35px] inline-block">
            <img
              className="object-cover w-full h-full"
              src="Google-Logo.svg"
              alt="googleLogo"
            />
          </div>
          <span className="ml-5"> Sign in with Google</span>
        </div>
      </button>
    </div>
  );
};

export default ButtonSignInGoogle;
