import React, { useEffect, useRef, useState } from "react";
import { debounce } from "lodash";
import { useNavigate } from "react-router-dom";
import { useSearchInput } from "../Contexts/SearchInputHeaderContext";
import { useAuth } from "../Contexts/AuthenContext";
import useWindowDimensions from "../Components/hook/useWindowDimension";
import { lgWidth, mdWidth, sidebarLists, xsWidth } from "../constant";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase/firebaseConfig";
import InputXsResponsive from "../Components/inputs/InputXsResponsive";

const Header = () => {
  const navigate = useNavigate();
  const { userAccount } = useAuth();
  const [showMenuIcon, setShowMenuIcon] = useState(false);
  const [showMenuSidebar, setShowMenuSidebar] = useState(false);
  const [showSearchBarXs, setShowSearchBarXs] = useState(false);
  const { width } = useWindowDimensions();
  const {
    inputSearchValue,
    setInputSearchValue,
    dropdownName,
    setDropdownName,
  } = useSearchInput();
  const inputRef = useRef();
  const dropdownRef = useRef();

  inputRef.current?.addEventListener(
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

  useEffect(() => {
    if (width >= lgWidth) {
      setShowMenuIcon(false);
    } else if (width >= xsWidth) {
      setShowMenuIcon(true);
    }
    if (width >= xsWidth && width < mdWidth) {
      inputRef.current.value = "";
    }
  }, [width]);

  const handleShowListSidebar = () => {
    setShowMenuSidebar(!showMenuSidebar);
  };

  const handleShowSearchBarXs = () => {
    setShowSearchBarXs(!showSearchBarXs);
  };

  const handleHideListSidebar = (e) => {
    if (e.target === e.currentTarget) {
      setShowMenuSidebar(false);
    }
  };

  const handleNavigate = (item) => {
    navigate(item.url);
    setShowMenuSidebar(false);
  };

  const handleLogOut = () => {
    signOut(auth);
    setTimeout(() => {
      window.location.reload(true);
    }, 200);
    navigate("/");
  };

  const handleNavigateUserProfile = () => {
    // console.log(userAccount);
    if (userAccount === null) {
      navigate("/sign-in");
    } else {
      navigate("/user-info");
    }
  };

  const handleSetValue = debounce((e) => {
    setInputSearchValue(e.target.value);
  }, 250);

  const handleShowDropdown = () => {
    dropdownRef.current?.classList.toggle("show");
  };

  const handleSetDropdownName = (e) => {
    dropdownRef.current?.classList.remove("show");
    setDropdownName(e.target.textContent);
  };

  return (
    <div className="fixed top-0 left-0 w-full py-[20px] xl:pl-[280px] lg:pl-[230px] xs:px-5 bg-primaryColorBg flex items-center justify-between z-40 text-secondarySidebarText  text-xl font-semibold leading-[30px]">
      {showMenuSidebar && (
        <div
          onClick={handleHideListSidebar}
          className="absolute top-0 bottom-0 left-0 z-40 w-screen h-screen bg-overlayApp"
        ></div>
      )}
      <div
        className={`z-50 absolute top-0 bottom-0 right-0 ${
          showMenuSidebar ? "translate-x-0" : "translate-x-full"
        } xs:w-screen sm:w-[250px] h-screen bg-[#fff4f4] lg:w-0 bg-overlayApp mt-[90px] transition-all`}
      >
        {sidebarLists.map((item) => (
          <div
            key={item.title}
            onClick={() => handleNavigate(item)}
            className="w-full  px-10 py-3 bg-[#fff4f4] cursor-pointer text-secondarySidebarText hover:text-hoverColorText hover:bg-hoverColorBg hover:border-r-8 hover:border-r-hoverColorBorder"
          >
            <i className={`mr-3 font-semibold bx  ${item.iconName}`}></i>
            <span>{item.title}</span>
          </div>
        ))}
        {userAccount?.email && showMenuSidebar && (
          <div
            onClick={handleLogOut}
            className="absolute right-0 w-full px-10 py-3 mt-10 text-xl font-semibold cursor-pointer bottom-[200px] text-secondarySidebarText hover:text-hoverColorText hover:bg-hoverColorBg hover:border-r-8 hover:border-r-hoverColorBorder"
          >
            <i className="font-semibold bx bx-log-out"></i>
            <span className="ml-2 leading-[30px] ">Log out</span>
          </div>
        )}
      </div>
      {width >= xsWidth && width <= mdWidth && (
        <InputXsResponsive
          value={{
            showSearchBarXs,
            setShowSearchBarXs,
            handleSetValue,
            dropdownName,
            inputSearchValue,
          }}
        ></InputXsResponsive>
      )}

      <div className="z-20 2xl:w-[900px] xl:w-[700px] lg:w-[550px] md:w-[350px] xs:w-auto md:flex-1 flex">
        <div className="relative sm:flex-1 xs:w-[60px] sm:block h-[65px]  ">
          <input
            ref={inputRef}
            type="text"
            disabled={`${width >= xsWidth && width < mdWidth ? "disable" : ""}`}
            placeholder={` ${
              width >= xsWidth && width < mdWidth
                ? ""
                : "Search for movies, TV shows..."
            }`}
            className="py-3 xs:px-5 md:px-10 xl:px-[101px] w-full h-full bg-secondaryColorBg md:rounded-[30px] xs:rounded-full outline-none "
            onChange={handleSetValue}
          />
          <span
            onClick={handleShowSearchBarXs}
            className="absolute text-2xl -translate-x-1/2 -translate-y-1/2 cursor-pointer xs:inline-block md:hidden left-1/2 top-1/2 text-mainColor"
          >
            <i className="font-semibold bx bx-search text-secondarySidebarText hover:text-mainColor"></i>
          </span>
        </div>

        <div className="relative ml-5 md:w-[112px] md:text-[20px] xs:text-base xs:w-[100px] h-[65px] text-hoverColorText">
          <button
            onClick={handleShowDropdown}
            className="w-full h-full px-5 py-2 bg-hoverColorBg"
          >
            {dropdownName}
          </button>
          <div
            ref={dropdownRef}
            className="absolute left-0 hidden top-[100%] text-center z-10 bg-slate-100 w-full dropdown-content"
          >
            <div
              onClick={handleSetDropdownName}
              className="w-full h-full py-2 mt-2 text-black cursor-pointer hover:text-hoverColorText"
            >
              Movie
            </div>
            <div
              onClick={handleSetDropdownName}
              className="w-full h-full py-2 text-black cursor-pointer hover:text-hoverColorText"
            >
              Tv
            </div>
          </div>
        </div>
      </div>

      <div className=" xl:w-[300px] md:w-[250px] xs:w-auto flex justify-end">
        {showMenuIcon && (
          <div
            onClick={handleShowListSidebar}
            className="mx-3 z-20 cursor-pointer hover:text-mainColor w-[70px] h-[70px] bg-secondaryColorBg rounded-full text-center flex items-center justify-center"
          >
            <i className="text-4xl bx bx-menu"></i>
          </div>
        )}
        <div
          onClick={handleNavigateUserProfile}
          className="z-20 cursor-pointer w-[70px]  bg-secondaryColorBg h-[70px] rounded-full overflow-hidden"
        >
          {userAccount ? (
            <img
              className="object-cover w-[70px] h-[70px]"
              src={userAccount?.avatar || "avatar-user-isAuthen.svg"}
              alt="unauthenAvatar"
            />
          ) : (
            <img
              className="object-cover w-[70px] h-[70px]"
              src="avatar-user-unAuthen-com.svg"
              alt="unauthenAvatar"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
