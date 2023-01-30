import React from "react";

const Footer = () => {
  return (
    <div className="w-full px-5 pt-5 pb-10 mt-10 border-t-2 bg-secondaryColorBg text-grayDarkText border-t-primarySidebarText">
      <div className="flex items-center justify-around w-full sm:flex-row xs:flex-col">
        <div className="flex flex-col text-center sm:w-1/2 xs:w-full xl:mx-14 xs:mx-5 sm:text-base xs:text-sm ">
          <img
            className="object-cover w-[150px] h-[150px] mx-auto"
            src="webLogo.png"
            alt=""
          />
          <p>
            Unknown Movies is a streaming service that offers a wide variety of
            award-winning TV shows, movies, anime, documentaries, and more on
            thousands of internet-connected devices. You can watch as much as
            you want, whenever you want without a single commercial – all for
            one low monthly price. There's always something new to discover and
            new TV shows and movies are added every week!
          </p>
        </div>
        <div className="flex justify-between sm:px-5 xs:px-2 sm:w-1/2 xs:w-full xs:mt-5 md:mt-0">
          <div className="w-1/2 ">
            <h3 className="inline-block py-2 mb-10 font-semibold leading-5 border-b-2 md:text-2xl sm:text-xl xs:text-lg sm:pr-20 xs:pr-16 border-b-primarySidebarText">
              Menu
            </h3>
            <ul className="md:text-base xs:text-sm">
              <li className="mb-2 list-none cursor-pointer hover:text-primarySidebarText text-grayDarkText">
                Theaters
              </li>
              <li className="mb-2 list-none cursor-pointer hover:text-primarySidebarText text-grayDarkText">
                Playcenter
              </li>
              <li className="mb-2 list-none cursor-pointer hover:text-primarySidebarText text-grayDarkText">
                Group Events
              </li>
              <li className="mb-2 list-none cursor-pointer hover:text-primarySidebarText text-grayDarkText">
                My Harkins Awards
              </li>
              <li className="list-none cursor-pointer hover:text-primarySidebarText text-grayDarkText">
                Behind the Screens
              </li>
            </ul>
          </div>
          <div className="w-1/2">
            <h3 className="inline-block py-2 mb-10 font-semibold leading-5 border-b-2 md:text-2xl sm:text-xl xs:text-lg sm:pr-20 xs:pr-16 border-b-primarySidebarText">
              More
            </h3>
            <ul className="md:text-base xs:text-sm">
              <li className="mb-2 list-none cursor-pointer hover:text-primarySidebarText text-grayDarkText">
                IMAX
              </li>
              <li className="mb-2 list-none cursor-pointer hover:text-primarySidebarText text-grayDarkText">
                IDM
              </li>
              <li className="mb-2 list-none cursor-pointer hover:text-primarySidebarText text-grayDarkText">
                Contact Us
              </li>
              <li className="mb-2 list-none cursor-pointer hover:text-primarySidebarText text-grayDarkText">
                Oscar Awards
              </li>
              <li className="mb-2 list-none cursor-pointer hover:text-primarySidebarText text-grayDarkText">
                Advertise screen
              </li>
            </ul>
          </div>
        </div>
        <div></div>
      </div>
      <div className="flex justify-center mt-10">
        <i className="transition-all cursor-pointer sm:mr-10 xs:mr-3 md:text-4xl xs:text-2xl text-primarySidebarText hover:scale-150 bx bxl-facebook-square"></i>
        <i className="transition-all cursor-pointer sm:mr-10 xs:mr-3 md:text-4xl xs:text-2xl text-primarySidebarText hover:scale-150 bx bxl-youtube"></i>
        <i className="transition-all cursor-pointer sm:mr-10 xs:mr-3 md:text-4xl xs:text-2xl text-primarySidebarText hover:scale-150 bx bxl-tumblr"></i>
        <i className="transition-all cursor-pointer sm:mr-10 xs:mr-3 md:text-4xl xs:text-2xl text-primarySidebarText hover:scale-150 bx bxl-twitter"></i>
        <i className="transition-all cursor-pointer sm:mr-10 xs:mr-3 md:text-4xl xs:text-2xl text-primarySidebarText hover:scale-150 bx bxl-reddit"></i>
        <i className="transition-all cursor-pointer sm:mr-10 xs:mr-3 md:text-4xl xs:text-2xl text-primarySidebarText hover:scale-150 bx bxl-meta"></i>
        <i className="transition-all cursor-pointer sm:mr-10 xs:mr-3 md:text-4xl xs:text-2xl text-primarySidebarText hover:scale-150 bx bxl-instagram-alt"></i>
        <i className="transition-all cursor-pointer sm:mr-10 xs:mr-3 md:text-4xl xs:text-2xl text-primarySidebarText hover:scale-150 bx bxl-linkedin-square"></i>
      </div>
      <div className="flex justify-center mt-10">
        <span className="cursor-pointer sm:mr-10 xs:mr-3 hover:text-primarySidebarText">
          Safty Protocols
        </span>
        <span className="cursor-pointer sm:mr-10 xs:mr-3 hover:text-primarySidebarText">
          Terms of Use
        </span>
        <span className="cursor-pointer hover:text-primarySidebarText">
          Privacy Policy
        </span>
      </div>
      <div className="flex justify-center text-center sm:mt-20 xs:mt-10">
        <span className="text-[#989AAD] font-medium text-[15px] leading-5 opacity-50">
          Copyright ©2022 Harkins Reels Deals, L.L.C. All Rights Reserved
        </span>
      </div>
    </div>
  );
};

export default Footer;
