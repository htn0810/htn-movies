import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { HeaderUrl } from "../../constant";
import Skeleton from "react-loading-skeleton";

const MiniSliderItem = ({ data, kind, isLoading }) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    if (!kind) return null;
    navigate(`/details?kind=${kind}&id=${data.id}`);
  };
  if (!data || !kind) return null;

  return (
    <Fragment>
      {!isLoading ? (
        <div className="lg:w-[207px] xl:w-[220px] xl:h-[350px]  md:w-[160px] md:h-[280px]  xs:w-[150px] xs:h-[250px] relative overflow-hidden rounded-lg item-minislider-wrapper cursor-pointer">
          <Skeleton
            variant="rectangular"
            animation="wave"
            baseColor="#202020"
            highlightColor="#333333"
            className="w-full h-full rounded-lg "
          />
        </div>
      ) : (
        <div
          onClick={handleNavigate}
          className="lg:w-[207px] xl:w-[220px] xl:h-[350px]  md:w-[160px] md:h-[280px]  xs:w-[150px] xs:h-[250px] relative overflow-hidden rounded-lg item-minislider-wrapper cursor-pointer"
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
          <div className=" absolute bottom-0 left-0 w-full hover:line-clamp-none line-clamp-1 bg-[rgba(0,0,0,.6)] text-center rounded-b-lg px-2 py-2 text-mainColor  font-medium md:text-lg md:leading-8 xs:text-sm xs:leading-9">
            {data.name || data.original_title}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default MiniSliderItem;
