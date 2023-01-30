import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { debounce } from "lodash";

const Input = ({
  type = "text",
  placeholder = "",
  name,
  setValue,
  value,
  ...props
}) => {
  const inputRef = useRef();
  useEffect(() => {
    setValue(inputRef.current?.value);
  }, [setValue]);
  const handleSetValue = debounce((e) => {
    setValue(e.target.value);
  }, 250);
  return (
    <div className="sm:w-[395px] h-[42px] xs:w-[330px] mt-8">
      <input
        ref={inputRef}
        id={name}
        type={type}
        className="w-full h-full font-normal lg:text-[24px] lg:leading-8 md:text-[22px] md:leading-7 xs:text-[20px] xs:leading-6 text-grayDarkText px-5 outline-none bg-signUpbg border-b border-b-grayColorText "
        placeholder={placeholder}
        onChange={(e) => handleSetValue(e)}
        defaultValue={value || null}
        {...props}
      />
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};

export default Input;
