import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useSearchParams } from "react-router-dom";
import DetailsBanner from "../Components/detailsInfomation/DetailsBanner";
import DetailsCast from "../Components/detailsInfomation/DetailsCast";
import DetailsDirector from "../Components/detailsInfomation/DetailsDirector";
import DetailsTimePopular from "../Components/detailsInfomation/DetailsTimePopular";
import DetailsTrailerVideo from "../Components/detailsInfomation/DetailsTrailerVideo";
import MiniSlider from "../Components/miniSliders/MiniSlider";
import { APIkey } from "../constant";
import { useSidebarCategory } from "../Contexts/SidebarCategoryContext";

const DetailsPage = () => {
  const [searchParams] = useSearchParams();
  const { setFocusOneCategory } = useSidebarCategory();
  const [detailsData, setDetailsData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const id = searchParams.get("id");
  const kind = searchParams.get("kind");
  const endpoint =
    !!kind && !!id && `https://api.themoviedb.org/3/${kind}/${id}?${APIkey}`;

  useEffect(() => {
    setIsLoading(false);
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        setDetailsData(data);
      });
    setTimeout(() => {
      setIsLoading(true);
    }, 250);
  }, [endpoint]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id, kind]);

  useEffect(() => {
    setFocusOneCategory([1, 1, 1, 1]);
  }, [setFocusOneCategory]);

  return (
    <div className="w-full h-full text-4xl text-white">
      <div className="w-full  md:h-[450px] sm:h-[400px] xs:h-[300px]  rounded-lg relative md:mb-10 xs:mb-[240px]">
        {isLoading ? (
          <DetailsBanner data={detailsData} kind={kind}></DetailsBanner>
        ) : (
          <Skeleton
            variant="rectangular"
            animation="wave"
            baseColor="#202020"
            highlightColor="#333333"
            className="w-full h-full rounded-lg "
          />
        )}
      </div>
      <div className="flex w-full mb-10">
        <div className="mr-5 basis-2/3 text-mainColor">
          {isLoading ? (
            <DetailsTimePopular
              kind={kind}
              data={detailsData}
            ></DetailsTimePopular>
          ) : (
            <Skeleton
              variant="rectangular"
              animation="wave"
              baseColor="#202020"
              highlightColor="#333333"
              className="w-full h-[200px] rounded-lg "
            />
          )}
        </div>
        <div className="flex flex-col basis-1/3 ">
          {isLoading ? (
            <DetailsDirector kind={kind} data={detailsData}></DetailsDirector>
          ) : (
            <Skeleton
              variant="rectangular"
              animation="wave"
              baseColor="#202020"
              highlightColor="#333333"
              className="w-full h-[200px] rounded-lg "
            />
          )}
        </div>
      </div>
      <div className="w-full mb-10 rounded-lg bg-secondaryColorBg">
        {isLoading ? (
          <DetailsCast dataId={detailsData?.id} kind={kind}></DetailsCast>
        ) : (
          <Skeleton
            variant="rectangular"
            animation="wave"
            baseColor="#202020"
            highlightColor="#333333"
            className="w-full h-[350px] rounded-lg "
          />
        )}
      </div>
      <div className="w-full mb-10 rounded-lg">
        {isLoading ? (
          <DetailsTrailerVideo
            dataId={detailsData?.id}
            kind={kind}
          ></DetailsTrailerVideo>
        ) : (
          <Skeleton
            variant="rectangular"
            animation="wave"
            baseColor="#202020"
            highlightColor="#333333"
            className="w-full h-[450px] rounded-lg "
          />
        )}
      </div>
      <h1 className="w-full text-center py-3 rounded-lg mb-5 bg-secondaryColorBg lg:text-2xl sm:text-xl xs:text-lg font-semibold leading-[30px] text-primarySidebarText">
        {`RELATED ${kind.toUpperCase()}S`}
      </h1>
      <div className="w-full py-3 mb-5 overflow-hidden rounded-lg bg-secondaryColorBg">
        {isLoading ? (
          <MiniSlider
            type={`/${kind}/${detailsData?.id}/similar?`}
            kind={kind}
          ></MiniSlider>
        ) : (
          <Skeleton
            variant="rectangular"
            animation="wave"
            baseColor="#202020"
            highlightColor="#333333"
            className="w-full h-[350px] rounded-lg "
          />
        )}
      </div>
    </div>
  );
};

export default DetailsPage;
