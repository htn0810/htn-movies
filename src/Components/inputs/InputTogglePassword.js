import React, { useState } from "react";
import PropTypes from "prop-types";
import IconEyeOpen from "../icons/IconEyeOpen";
import IconEyeClose from "../icons/IconEyeClose";
import { debounce } from "lodash";

const InputTogglePassword = ({
  type = "password",
  placeholder = "",
  name,
  setValue,
  ...props
}) => {
  const [togglePassword, setTogglePassword] = useState(true);
  const [typeInput, setTypeInput] = useState(type);
  const handleSetValue = debounce((e) => setValue(e.target.value || ""), 250);
  return (
    <div className="sm:w-[395px] h-[42px] xs:w-[330px] mt-8 relative">
      <input
        id={name}
        type={typeInput}
        className="w-full h-full font-normal lg:text-[24px] lg:leading-8 md:text-[22px] md:leading-7 xs:text-[20px] xs:leading-6 text-grayDarkText px-5 outline-none bg-signUpbg border-b border-b-grayColorText "
        placeholder={placeholder}
        onChange={(e) => handleSetValue(e)}
        {...props}
      />
      {!togglePassword && (
        <IconEyeOpen
          onClick={() => {
            setTogglePassword(!togglePassword);
            setTypeInput("password");
          }}
        ></IconEyeOpen>
      )}
      {togglePassword && (
        <IconEyeClose
          onClick={() => {
            setTogglePassword(!togglePassword);
            setTypeInput("text");
          }}
        ></IconEyeClose>
      )}
    </div>
  );
};

InputTogglePassword.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};
export default InputTogglePassword;
