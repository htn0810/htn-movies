import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ButtonSignInGoogle from "../Components/buttons/ButtonSignInGoogle";
import Input from "../Components/inputs/Input";
import InputTogglePassword from "../Components/inputs/InputTogglePassword";
import { useAuth } from "../Contexts/AuthenContext";
import { auth } from "../Firebase/firebaseConfig";

const SignInPage = () => {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [errorEmailValue, setErrorEmailValue] = useState("");
  const [errorPasswordValue, setErrorPasswordValue] = useState("");
  const { userAccount } = useAuth();
  const navigate = useNavigate();
  const form = document.getElementsByName("sign-up-form")[0];

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSignIn = async (userInfo) => {
    signInWithEmailAndPassword(
      auth,
      userInfo.emailValue,
      userInfo.passwordValue
    )
      .then(() => {
        toast.success("Login successful!", {
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
        toast.warning("Your password/email is incorrect!", {
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
  };

  useEffect(() => {
    document.title = "Login Page";
    if (userAccount?.email) {
      navigate("/");
      form.reset();
    }
  }, [form, navigate, userAccount?.email]);

  const handleSubmit = (e) => {
    let checkEmail = null;
    e.preventDefault();
    if (emailValue === "") {
      setErrorEmailValue("Please enter your email address");
    } else {
      checkEmail = validateEmail(emailValue);
      if (checkEmail) setErrorEmailValue("");
      else setErrorEmailValue("Please enter valid email address");
    }
    if (passwordValue === "") {
      setErrorPasswordValue("Please enter your password");
    } else {
      setErrorPasswordValue("");
    }
    if (errorEmailValue === "" && errorPasswordValue === "") {
      let userInfo = { emailValue, passwordValue };
      handleSignIn(userInfo);
    }
  };

  return (
    <div className="flex w-screen h-screen text-mainColor">
      <div className="xl:w-[600px] md:w-[500px] xs:flex-1 md:flex-none flex justify-center items-center h-full bg-signUpbg">
        <div className="flex flex-col items-center text-center">
          <h1 className="font-medium lg:text-[36px] sm:text-[32px] xs:text-[28px]">
            Wellcome back
          </h1>
          <span className="text-grayColorText lg:text-[22px] md:text-[18px] xs:text-[14px] ">
            Welcome back! Please enter your details.
          </span>
          <ButtonSignInGoogle></ButtonSignInGoogle>
          <div className="md:w-[395px] sm:w-[360px] xs:w-[340px] mt-24 border-t-[1px] border-t-grayDarkText relative">
            <span className="absolute top-0 py-2 -translate-x-1/2 -translate-y-1/2 text-grayDarkText px-9 left-1/2 bg-signUpbg">
              or
            </span>
          </div>
          <form
            name="sign-up-form"
            onSubmit={handleSubmit}
            className="mt-4"
            autoComplete="off"
          >
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
              Sign In
            </button>
          </form>
          <span className="mt-14 font-normal text-[14px] leading-[21px] text-grayColorText">
            Don’t have an account ? <span> </span>
            <NavLink to="/sign-up">
              <span className="text-mainColor">Sign up for free </span>
            </NavLink>
          </span>
        </div>
      </div>
      <div className="md:flex-1 h-full blur-[0.5px] bg-signInPhoto bg-cover relative xs:hidden md:block">
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
    </div>
  );
};

export default SignInPage;
