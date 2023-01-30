import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import MainSlider from "../Components/mainSlider/MainSlider";

import MiniSlider from "../Components/miniSliders/MiniSlider";
import MiniSliderVertical from "../Components/miniSliders/MiniSliderVertical";
import { APIkey } from "../constant";
import { useSidebarCategory } from "../Contexts/SidebarCategoryContext";

const HomePage = () => {
  const endpoint = `https://api.themoviedb.org/3/movie/now_playing?${APIkey}`;
  const [latestMovies, setLatestMovies] = useState([]);
  const { setFocusOneCategory } = useSidebarCategory();
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    setIsLoading(false);
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        setLatestMovies(data?.results);
      });
    setTimeout(() => {
      setIsLoading(true);
    }, 250);
  }, [endpoint]);
  //   console.log(latestMovies);

  useEffect(() => {
    document.title = "Unknown Movies";
    setFocusOneCategory([0, 1, 1, 1]);
  }, [setFocusOneCategory]);

  return (
    <div>
      <div className="flex">
        <div className="2xl:w-[900px] xl:w-[700px] lg:w-[550px] md:w-[500px] xs:w-full flex-1 h-full mr-5 text-textHomePage">
          {isLoading ? (
            <MainSlider latestMovies={latestMovies}></MainSlider>
          ) : (
            <Skeleton
              variant="rectangular"
              animation="wave"
              baseColor="#202020"
              highlightColor="#333333"
              className="w-full h-[400px] rounded-lg "
            />
          )}

          <div className="mt-5">
            <h1 className="mb-5 text-xl font-semibold leading-[30px] text-primarySidebarText">
              TV AIRING TODAY
            </h1>
            <MiniSlider kind="tv" type="/tv/airing_today?"></MiniSlider>
          </div>
          <div className="mt-10">
            <h1 className="mb-5 text-xl font-semibold leading-[30px] text-primarySidebarText">
              MOVIES POPULAR
            </h1>
            <MiniSlider kind="movie" type="/movie/popular?"></MiniSlider>
          </div>
        </div>
        <div>
          <div className="xl:max-w-[300px] md:max-w-[250px] xl:h-[1302px] lg:h-[1180px] md:h-[1150px] xs:hidden md:flex flex-col">
            <h1 className="text-xl text-center font-semibold leading-[30px] text-primarySidebarText">
              TRENDING OF THE DAY
            </h1>
            <MiniSliderVertical
              kind="movie"
              type="/trending/all/day?"
            ></MiniSliderVertical>
          </div>
        </div>
      </div>
      <div className="relative xl:mt-10 xs:mt-3 text-mainColor">
        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-1/2 h-1/4 bg-hoverColorBg blur-[67px] -rotate-12"></div>
        <div className="flex px-5 xl:py-10 md:py-5 xs:py-2 bg-overlayApp rounded-xl">
          <div className="z-10 pt-10 xl:pl-20 xs:pl-0 basis-4/6 ">
            <h1 className="font-medium xl:text-[32px] xl:leading-[40px] lg:text-[28px] lg:leading-[30px] md:text-[18px] md:leading-5 xs:text-[14px] xl:mb-10 lg:mb-5 xs:mb-3">
              Book your movie from anywhere
            </h1>
            <p className="font-normal md:leading-6 text-gray-200 xl:mb-6 lg:mb-3 xs:mb-2 xl:text-base lg:text-sm xs:text-[10px]">
              Now, enjoy that experience on the go with the Harkins Theatres
              App! It’s the best way to view showtimes, buy tickets, watch
              trailers and find out about the latest movie events happening at
              Harkins Theatres.
            </p>
            <ul
              className="ml-5 list-disc xl:text-sm lg:text-xs lg:leading-[22px] xs:text-[10px]
 "
            >
              <li className="mb-2 ">
                Look up movies and showtimes and share them with friends and
                family.
              </li>
              <li className="mb-2 ">
                Be the first to find out about the latest Harkins events and
                promotions
              </li>
              <li className="mb-2 ">
                See theatre amenities and view theatre location maps
              </li>
              <li className="mb-2 ">
                Use easy-to-navigate icon indicators for movie features and
                amenities like 3D, IMAX, Audio Description (AD), Closed Caption
                (CC) and more
              </li>
            </ul>
            <div className="flex mb-5">
              <img
                className="object-cover h-[40px] w-[120px] cursor-pointer"
                src="AppStore.svg"
                alt="AppStore"
              />
              <img
                className="object-cover h-[40px] w-[135px] ml-5 cursor-pointer"
                src="GooglePlay.svg"
                alt="GooglePlay"
              />
            </div>
          </div>
          <div className="z-10 my-auto ml-2 basis-2/6">
            <img
              className="object-cover xl:w-[331px] xl:h-[420px] lg:w-[300px] lg:h-[380px] sm:w-[250px] sm:h-[320px] xs:w-[120px] xs:h-[200px]"
              src="android.svg"
              alt="appAndroid"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
