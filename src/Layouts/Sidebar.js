import { signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { sidebarLists } from "../constant";
import { useAuth } from "../Contexts/AuthenContext";
import { useSidebarCategory } from "../Contexts/SidebarCategoryContext";
import { auth } from "../Firebase/firebaseConfig";

const Sidebar = () => {
  const { userAccount } = useAuth();
  const { focusOneCategory, setFocusOneCategory } = useSidebarCategory();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [focusOneCategory]);

  const handleClickCategory = (item) => {
    switch (item.id) {
      case 0:
        setFocusOneCategory([0, 1, 1, 1]);
        break;
      case 1:
        setFocusOneCategory([1, 0, 1, 1]);
        break;
      case 2:
        setFocusOneCategory([1, 1, 0, 1]);
        break;
      case 3:
        setFocusOneCategory([1, 1, 1, 0]);
        break;
      default:
        setFocusOneCategory([1, 1, 1, 1]);
        break;
    }
  };

  const handleLogOut = () => {
    signOut(auth);
    setTimeout(() => {
      window.location.reload(true);
    }, 200);
    navigate("/");
  };

  return (
    <div className="xl:w-[250px] lg:w-[200px] xs:w-0 xs:h-0 lg:block xs:hidden lg:h-full fixed top-0 left-0 bottom-0 bg-secondaryColorBg  z-50">
      <div
        onClick={() => navigate("/")}
        className="w-[180px] h-[100px] mt-[33px] mb-[80px] mx-auto"
      >
        <img
          className="object-cover w-full h-full cursor-pointer"
          src="webLogo.png"
          alt="Logo"
        />
      </div>
      {sidebarLists.map((item) => (
        <Link to={item.url} key={item.iconName}>
          <div
            onClick={() => handleClickCategory(item)}
            className={`${
              focusOneCategory?.length > 0 && focusOneCategory[item.id] === 0
                ? "text-hoverColorText bg-hoverColorBg border-r-8 border-r-hoverColorBorder"
                : ""
            } cursor-pointer w-full h-[86px] pl-[31px] text-xl font-semibold text-secondarySidebarText flex items-center hover:text-hoverColorText hover:bg-hoverColorBg hover:border-r-8 hover:border-r-hoverColorBorder`}
          >
            <div>
              <i
                className={`h-full font-semibold bx bx-home-alt-2 ${item.iconName}`}
              ></i>
            </div>
            <h2 className="inline-block ml-4 leading-[30px]">{item.title}</h2>
          </div>
        </Link>
      ))}
      {userAccount?.email && (
        <div
          onClick={handleLogOut}
          className="flex items-center cursor-pointer w-full pl-[31px] h-[86px] mt-10 mx-auto text-xl font-semibold text-center text-secondarySidebarText hover:text-hoverColorText hover:bg-hoverColorBg hover:border-r-8 hover:border-r-hoverColorBorder"
        >
          <i className="font-semibold bx bx-log-out"></i>
          <span className="ml-2 leading-[30px] ">Log out</span>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
