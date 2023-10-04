import React from "react";
import { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import SliderItem from "./SliderItem";

const MainSlider = ({ latestMovies }) => {
  if (!latestMovies) return null;
  return (
    <div className="xxxl:h-[500px] 2xl:h-[450px] lg:h-[400px] md:h-[350px] xs:h-[300px]  mb-10 cursor-pointer">
      <Swiper
        modules={[Navigation, Autoplay]}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        grabCursor="true"
        spaceBetween={0}
        slidesPerView={"auto"}
      >
        {latestMovies?.length > 0 &&
          latestMovies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <SliderItem movieValue={movie}></SliderItem>
            </SwiperSlide>
          ))}
        <div className="swiper-button-next"></div>
        <div className="swiper-button-prev"></div>
      </Swiper>
    </div>
  );
};

export default MainSlider;
