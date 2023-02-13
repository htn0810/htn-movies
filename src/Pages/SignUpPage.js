import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Input from "../Components/inputs/Input";
import { auth, db } from "../Firebase/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

import InputTogglePassword from "../Components/inputs/InputTogglePassword";
import { NavLink, useNavigate } from "react-router-dom";
import ButtonSignInGoogle from "../Components/buttons/ButtonSignInGoogle";
import { toast } from "react-toastify";

const SignUpPage = () => {
  const [nameValue, setNameValue] = useState();
  const [emailValue, setEmailValue] = useState();
  const [passwordValue, setPasswordValue] = useState();
  const [errorNameValue, setErrorNameValue] = useState();
  const [errorEmailValue, setErrorEmailValue] = useState();
  const [errorPasswordValue, setErrorPasswordValue] = useState();
  const navigate = useNavigate();

  const validateEmailRegex = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validateName = (name) => {
    if (!name) {
      setErrorNameValue("Please enter your name");
      return false;
    } else {
      setErrorNameValue("");
      return true;
    }
  };

  const validatePassword = (password) => {
    if (!password) {
      setErrorPasswordValue("Please enter your password");
      return false;
    } else if (passwordValue?.length < 6) {
      setErrorPasswordValue("Your password must have at least 6 characters");
      return false;
    } else {
      setErrorPasswordValue("");
      return true;
    }
  };

  const validateEmail = (email) => {
    let checkEmail = null;
    if (!email) {
      setErrorEmailValue("Please enter your email address");
      return false;
    } else {
      checkEmail = validateEmailRegex(email);
      if (checkEmail) {
        setErrorEmailValue("");
        return true;
      } else {
        setErrorEmailValue("Please enter valid email address");
        return false;
      }
    }
  };

  const handleCreateUser = async (userInfo) => {
    const colRef = collection(db, "users");
    createUserWithEmailAndPassword(
      auth,
      userInfo.emailValue,
      userInfo.passwordValue
    )
      .then(() => {
        toast.success("Create account successful!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      })
      .catch(() => {
        toast.warning("Something went wrong!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });
    await addDoc(colRef, {
      email: userInfo.emailValue,
      name: userInfo.nameValue,
      password: userInfo.passwordValue,
    });
    navigate("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validate =
      validateName(nameValue) &&
      validateEmail(emailValue) &&
      validatePassword(passwordValue);
    if (validate) {
      let userInfo = { nameValue, emailValue, passwordValue };
      handleCreateUser(userInfo);
    }
  };

  return (
    <div className="flex w-screen h-screen text-mainColor">
      <div className="md:flex-1 h-full blur-[0.5px] bg-signUpPhoto bg-cover relative xs:hidden md:block">
        <div className="absolute top-0 bottom-0 left-0 w-full h-full bg-overlay"></div>
        <div className="w-[80px] h-[80px] rounded-2xl overflow-hidden m-10">
          <img
            className="object-cover w-full h-full"
            src="webLogo.jpg"
            alt="logo"
          />
        </div>
        <div className="w-4/5 h-[313px] mx-[57px] xl:mt-[200px] lg:mt-[150px] md:mt-[100px] xs:hidden md:block">
          <h2 className="font-semibold xl:text-[32px] xl:leading-[48px] lg:text-[28px] lg:leading-[44px] md:text-[24px] md:leading-[40px] text-mainColor ">
            Benefits of your free IMDb account
          </h2>
          <div className="xl:mt-10 lg:mt-7 md:mt-4">
            <h4 className="font-semibold xl:text-[20px] xl:leading-[30px] lg:text-lg lg:leading-7 md:text-md md:leading-6">
              Personalized Recommendations
            </h4>
            <span className="font-normal xl:text-[20px] xl:leading-[30px] lg:text-lg lg:leading-7 md:text-md md:leading-6">
              Discover shows you'll love.
            </span>
          </div>
          <div className="xl:mt-10 lg:mt-7 md:mt-4">
            <h4 className="font-semibold xl:text-[20px] xl:leading-[30px] lg:text-lg lg:leading-7 md:text-md md:leading-6">
              Your Ratings
            </h4>
            <span className="font-normal xl:text-[20px] xl:leading-[30px] lg:text-lg lg:leading-7 md:text-md md:leading-6">
              Rate and remember everything you've seen.
            </span>
          </div>
          <div className="xl:mt-10 lg:mt-7 md:mt-4">
            <h4 className="font-semibold xl:text-[20px] xl:leading-[30px] lg:text-lg lg:leading-7 md:text-md md:leading-6">
              Contribute to IMDb
            </h4>
            <span className="font-normal xl:text-[20px] xl:leading-[30px] lg:text-lg lg:leading-7 md:text-md md:leading-6">
              Add data that will be seen by millions of people and get cool
              badges.
            </span>
          </div>
        </div>
      </div>
      <div className="xl:w-[600px] md:w-[500px] xs:flex-1 md:flex-none flex justify-center items-center h-full bg-signUpbg">
        <div className="flex flex-col items-center text-center">
          <h1 className="font-medium lg:text-[36px] sm:text-[32px] xs:text-[28px]">
            Create an account
          </h1>
          <span className="text-grayColorText lg:text-[22px] md:text-[18px] xs:text-[14px] ">
            Let’s get started with your 30 days free trial.
          </span>
          <form
            name="sign-up-form"
            onSubmit={handleSubmit}
            className="flex flex-col items-center mt-4"
            autoComplete="off"
          >
            <Input
              name="Name"
              setValue={setNameValue}
              type="text"
              placeholder="Name"
            ></Input>
            {errorNameValue !== "" && (
              <span className="float-left mt-1 text-red-500">
                {errorNameValue}
              </span>
            )}
            <Input
              name="email"
              setValue={setEmailValue}
              type="email"
              placeholder="Email"
            ></Input>
            {errorEmailValue !== "" && (
              <span className="float-left mt-1 text-red-500">
                {errorEmailValue}
              </span>
            )}
            <InputTogglePassword
              name="password"
              setValue={setPasswordValue}
              type="password"
              placeholder="Password"
            ></InputTogglePassword>
            {errorPasswordValue !== "" && (
              <span className="float-left mt-1 text-red-500">
                {errorPasswordValue}
              </span>
            )}
            <button
              type="submit"
              className="md:w-[395px] sm:w-[350px] xs:w-[330px]  md:h-[80px] xs:h-[60px]  lg:leading-[33px] lg:text-[22px] md:mt-10  md:leading-[30px] md:text-[20px] xs:mt-7 xs:text-[18px] xs:leading-[28px] rounded-[15px] bg-slate-100 text-blackText font-semibold "
            >
              Create account
            </button>
          </form>
          <ButtonSignInGoogle></ButtonSignInGoogle>
          <span className="mt-14 font-normal text-[14px] leading-[21px] text-grayColorText">
            Already have an account ? <span> </span>
            <NavLink to="/sign-in">
              <span className="text-mainColor">Sign in</span>
            </NavLink>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
