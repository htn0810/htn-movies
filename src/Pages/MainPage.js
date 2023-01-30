import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Layouts/Footer";
import Header from "../Layouts/Header";
import Sidebar from "../Layouts/Sidebar";

const MainPage = () => {
  return (
    <div className="flex justify-center min-h-screen min-w-screen bg-primaryColorBg">
      <div className="w-full h-full">
        <Sidebar></Sidebar>
        <Header></Header>
        <div className="pt-[110px] xl:pl-[280px] lg:pl-[230px] lg:pr-5 xs:px-5 bg-primaryColorBg">
          <Outlet></Outlet>
          <Footer></Footer>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
