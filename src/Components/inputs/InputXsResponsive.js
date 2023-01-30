import { debounce } from "lodash";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

const InputXsResponsive = ({ value }) => {
  const inputXsRef = useRef();
  const {
    showSearchBarXs,
    setShowSearchBarXs,
    handleSetValue,
    dropdownName,
    inputSearchValue,
  } = value;
  const navigate = useNavigate("");
  const handleHideSearchBarXs = (e) => {
    if (e.target === e.currentTarget) {
      setShowSearchBarXs(false);
    }

    inputXsRef.current?.addEventListener(
      "keypress",
      debounce((e) => {
        if (
          e.key === "Enter" &&
          dropdownName !== "Kind...?" &&
          inputSearchValue.trim() !== ""
        ) {
          setShowSearchBarXs(false);
          navigate(`/search`);
        }
      }, 1000)
    );
  };
  return (
    <div
      onClick={handleHideSearchBarXs}
      className={`z-50 absolute top-0 right-0 px-5 ${
        showSearchBarXs ? "translate-y-0" : "-translate-y-[200%]"
      } w-full  h-screen bg-overlayApp pt-[100px]  transition-all`}
    >
      <input
        ref={inputXsRef}
        type="text"
        placeholder="Search for movies, TV shows..."
        className="w-full px-10 py-5 rounded-[30px] outline-none bg-secondaryColorBg text-mainColor"
        onChange={handleSetValue}
      />
    </div>
  );
};

export default InputXsResponsive;
