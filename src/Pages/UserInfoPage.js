import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UpdateUserAvatar from "../Components/userInfomation/UpdateUserAvatar";
import UpdateUserInfo from "../Components/userInfomation/UpdateUserInfo";
import UpdateUserPassword from "../Components/userInfomation/UpdateUserPassword";
import { useAuth } from "../Contexts/AuthenContext";
import { useSidebarCategory } from "../Contexts/SidebarCategoryContext";

const UserInfoPage = () => {
  const { userAccount } = useAuth();
  const [userData, setUserData] = useState({ ...userAccount });
  // console.log(userData);
  const { setFocusOneCategory } = useSidebarCategory();

  const navigate = useNavigate();
  useEffect(() => {
    setFocusOneCategory([1, 1, 1, 1, 1]);
    document.title = "User Profile";
    if (!userAccount) {
      navigate("/");
    }
  }, [navigate, setFocusOneCategory, userAccount]);

  return (
    <div className="flex w-full h-full text-white lg:text-4xl md:text-3xl sm:text-2xl xs:text-xl md:flex-row xs:flex-col ">
      {userData && (
        <Fragment>
          <div className="flex flex-col items-center justify-center xl:basis-2/6 xs:basis-1/2">
            <UpdateUserAvatar
              userData={userData}
              setUserData={setUserData}
            ></UpdateUserAvatar>
          </div>
          <div className="flex flex-col items-center justify-center xl:basis-3/6 xs:basis-1/2">
            <UpdateUserInfo
              userData={userData}
              setUserData={setUserData}
            ></UpdateUserInfo>
            <UpdateUserPassword
              userData={userData}
              setUserData={setUserData}
            ></UpdateUserPassword>
          </div>
          <div className="flex-col items-center justify-center xl:flex xs:hidden bg-secondaryColorBg basis-1/6 rounded-xl">
            <div className="w-[100px] h-[100px]">
              <img
                className="object-cover w-full h-full"
                src="upgrade.png"
                alt="upgradeImage"
              />
            </div>
            <div className="mt-5 text-center">
              <h1 className="text-lg font-normal">
                Upgrade to <span className="font-bold">Pro</span>
              </h1>
              <p className="text-sm font-light text-secondarySidebarText">
                Are you ready to improve movie-viewing experience?
              </p>
            </div>
            <div className="w-2/3 px-2 py-2 mt-5 text-xl text-center rounded-lg cursor-pointer bg-hoverColorBg">
              Upgrade
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default UserInfoPage;
