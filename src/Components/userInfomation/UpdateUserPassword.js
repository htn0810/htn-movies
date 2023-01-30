import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { db } from "../../Firebase/firebaseConfig";
import { getAuth, updatePassword } from "firebase/auth";
import Input from "../inputs/Input";
import InputTogglePassword from "../inputs/InputTogglePassword";

const UpdateUserPassword = ({ userData, setUserData }) => {
  const form = document.getElementsByName("change-password-form")[0];
  const [passwordValue, setPasswordValue] = useState();
  const [newPasswordValue, setNewPasswordValue] = useState();
  const [errorPasswordValue, setErrorPasswordValue] = useState();
  const [errorNewPasswordValue, setErrorNewPasswordValue] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const handleChangePassword = async () => {
    setIsLoading(true);
    const auth = getAuth();
    const user = auth.currentUser;
    const docRef = doc(db, "users", userData?.id);
    // console.log(userData);
    setUserData({ ...userData, password: newPasswordValue });
    await updateDoc(docRef, {
      ...userData,
      password: newPasswordValue,
    });
    userData = { ...userData, password: newPasswordValue };
    await updatePassword(user, newPasswordValue);
    toast.success("Change password successfull!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    form.reset();
    // console.log(userData);
    setIsLoading(false);
  };

  const checkOldPassword = () => {
    if (!passwordValue) {
      setErrorPasswordValue("Please enter your old password");
      return false;
    } else if (passwordValue?.length < 6) {
      setErrorPasswordValue("Your password must have at least 6 characters");
      return false;
    } else if (passwordValue !== userData.password) {
      setErrorPasswordValue("Your old password is not correct");
      return false;
    } else {
      setErrorPasswordValue("");
      return true;
    }
  };

  const checkNewPassword = () => {
    if (!newPasswordValue) {
      setErrorNewPasswordValue("Please enter your new password");
      return false;
    } else if (newPasswordValue?.length < 6) {
      setErrorNewPasswordValue("Your password must have at least 6 characters");
      return false;
    } else {
      setErrorNewPasswordValue("");
      return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const oldCheck = checkOldPassword();
    const newCheck = checkNewPassword();
    if (oldCheck && newCheck) {
      handleChangePassword();
    }
  };
  if (userData.password === "") return null;
  return (
    <form
      className="flex flex-col items-center mt-10"
      name="change-password-form"
      onSubmit={handleSubmit}
      autoComplete="off"
    >
      <Input
        name="oldpassword"
        setValue={setPasswordValue}
        type="password"
        placeholder="Old password"
      ></Input>
      {errorPasswordValue !== "" && (
        <span className="float-left mt-2 text-sm text-red-500">
          {errorPasswordValue}
        </span>
      )}
      <InputTogglePassword
        name="newpassword"
        setValue={setNewPasswordValue}
        type="password"
        placeholder="New password"
      ></InputTogglePassword>
      {errorNewPasswordValue !== "" && (
        <span className="float-left mt-2 text-sm text-red-500">
          {errorNewPasswordValue}
        </span>
      )}
      <button
        type="submit"
        className="w-1/2 lg:h-[60px] sm:h-[55px] xs:h-[50px] px-3 py-2 rounded-[15px] text-mainColor bg-hoverColorBg font-semibold lg:leading-[33px] lg:text-[22px] sm:text-lg xs:text-base  mt-10"
      >
        {isLoading ? (
          <div className="flex items-center justify-center w-full h-full">
            <span className="w-[25px] h-[25px] rounded-full border-4 border-hoverColorText border-t-transparent animate-spin"></span>
          </div>
        ) : (
          "Change"
        )}
      </button>
    </form>
  );
};

export default UpdateUserPassword;
