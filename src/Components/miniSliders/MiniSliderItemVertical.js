import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { HeaderUrl } from "../../constant";

const MiniSliderItemVertical = ({ data, kind }) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    if (!kind) return null;

    navigate(`/details?kind=${kind}&id=${data.id}`);
  };
  if (!data || !kind) return null;
  return (
    <Fragment>
      <div
        onClick={handleNavigate}
        className="item-minislider-wrapper w-full xl:h-[380px] lg:h-[350px] md:h-[320px] xs:h-[220px] relative overflow-hidden cursor-pointer rounded-lg"
      >
        <img
          src={`${HeaderUrl}${data.poster_path}`}
          className="object-cover w-full h-full transition-all rounded-lg"
          alt=""
        />
        <div className="absolute top-0 left-0 w-full h-full rounded-lg bg-overlay"></div>
        <div className="absolute flex justify-center items-center top-0 right-0 w-[68px] rounded-tr-lg rounded-bl-lg h-[28px] bg-[rgba(0,0,0,.5)] text-center">
          <span className="font-medium text-base leading-[24px] text-[#E8E8E8]">
            {data.vote_average.toFixed(1)}
          </span>
          <i className="ml-1 text-base text-[#F0CB35] font-medium bx bxs-star"></i>
        </div>
        <div className="absolute bottom-0 left-0 w-full py-2 bg-[rgba(0,0,0,.6)]  hover:line-clamp-none line-clamp-1 text-center rounded-b-lg px-2 text-mainColor font-medium text-lg  leading-8">
          {data.name || data.original_title}
        </div>
      </div>
    </Fragment>
  );
};

export default MiniSliderItemVertical;
