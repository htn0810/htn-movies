import React from "react";
import { useNavigate } from "react-router-dom";
import { HeaderUrl } from "../../constant";
import SliderCategory from "./SliderCategory";

const SliderItem = ({ movieValue }) => {
  const navigate = useNavigate();
  const urlBgImage = `${HeaderUrl}${movieValue?.backdrop_path}`;
  if (!movieValue) return null;
  return (
    <div
      onClick={() => navigate(`/details?kind=movie&id=${movieValue.id}`)}
      className="relative w-full xxxl:h-[550px] 2xl:h-[450px] lg:h-[400px] md:h-[350px] xs:h-[300px] "
    >
      <div className="w-full h-full">
        <img
          src={urlBgImage}
          alt="movieBanner"
          className="object-cover w-full h-full rounded-[20px]"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[rgba(0,0,0,0.85)] to-[rgba(0,0,0,0.1)] rounded-[20px]"></div>
      </div>
      <div className="absolute bottom-0 w-full transition-all lg:px-10 sm:px-5 xs:px-3">
        <h1 className="font-semibold xl:text-[45px] lg:text-[30px] xs:text-[20px]  text-primarySidebarText mb-3">
          {movieValue?.original_title}
        </h1>
        <SliderCategory dataId={movieValue.id}></SliderCategory>
        <p className="mt-5 xl:mb-[50px] md:mb-[30px] xs:mb-[15px] font-light hover:line-clamp-none line-clamp-3 xl:text-[17px] md:text-[14px] xs:text-[12px]">
          {movieValue?.overview}
        </p>
      </div>
    </div>
  );
};

export default SliderItem;
