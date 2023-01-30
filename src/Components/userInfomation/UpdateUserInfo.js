import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../../Firebase/firebaseConfig";
import { toast } from "react-toastify";
import { getAuth, updateEmail } from "firebase/auth";

import Input from "../inputs/Input";
import { useAuth } from "../../Contexts/AuthenContext";

const UpdateUserInfo = ({ userData, setUserData }) => {
  const [nameValue, setNameValue] = useState();
  const [emailValue, setEmailValue] = useState();
  const [errorNameValue, setErrorNameValue] = useState();
  const [errorEmailValue, setErrorEmailValue] = useState();
  let { userAccount, setUserAccount } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleUpdateInfo = async () => {
    setIsLoading(true);
    const auth = getAuth();
    // cập nhật email
    await updateEmail(auth.currentUser, emailValue);
    //  cập nhật email mark
    const colRefMarks = collection(db, "marks");
    const q = query(colRefMarks, where("account", "==", userData.email));
    onSnapshot(q, (snapshot) => {
      snapshot.docs.forEach(async (docData) => {
        const docRefMarksUpdate = doc(db, "marks", docData.id);
        await updateDoc(docRefMarksUpdate, {
          ...docData.data(),
          account: emailValue,
        });
      });
    });
    // cập nhật email user
    const docRefUpdate = doc(db, "users", userData?.id);
    // cập nhật userData
    await updateDoc(docRefUpdate, {
      ...userData,
      email: emailValue,
      name: nameValue,
    });
    setUserData({ ...userData, email: emailValue, name: nameValue });
    setUserAccount({ ...userAccount, email: emailValue });

    toast.success("Update info successfull!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    setIsLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nameValue === "" || nameValue === undefined) {
      setErrorNameValue("Please enter your name");
    } else setErrorNameValue("");
    if (emailValue === "" || emailValue === undefined) {
      setErrorEmailValue("Please enter your email address");
    } else {
      const checkEmail = validateEmail(emailValue);
      if (checkEmail) {
        setErrorEmailValue("");
        if (!errorNameValue) {
          handleUpdateInfo();
        }
      } else {
        setErrorEmailValue("Please enter valid email address");
      }
    }
  };
  return (
    <form
      className="flex flex-col items-center"
      name="change-info-form"
      onSubmit={handleSubmit}
      autoComplete="off"
    >
      <Input
        name="name"
        setValue={setNameValue}
        type="text"
        placeholder="Name"
        value={userData?.name}
      ></Input>
      {errorNameValue !== "" && (
        <span className="float-left mt-2 text-sm text-red-500">
          {errorNameValue}
        </span>
      )}
      <Input
        name="email"
        setValue={setEmailValue}
        type="email"
        placeholder="Email"
        value={userData?.email}
      ></Input>
      {errorEmailValue !== "" && (
        <span className="float-left mt-2 text-sm text-red-500">
          {errorEmailValue}
        </span>
      )}
      <button
        type="submit"
        className="w-1/2 lg:h-[60px] sm:h-[55px] xs:h-[50px] px-3 py-2 rounded-[15px] bg-hoverColorBg text-mainColor font-semibold lg:leading-[33px] lg:text-[22px] sm:text-lg xs:text-base mt-10"
      >
        {isLoading ? (
          <div className="flex items-center justify-center w-full h-full">
            <span className="w-[25px] h-[25px] rounded-full border-4 border-hoverColorText border-t-transparent animate-spin"></span>
          </div>
        ) : (
          "Update"
        )}
      </button>
    </form>
  );
};

export default UpdateUserInfo;
