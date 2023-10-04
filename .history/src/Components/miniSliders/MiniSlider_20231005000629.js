import React, { Fragment, useEffect, useState } from "react";
import { A11y, Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { APIkey, Url, xlWidth, xsWidth, xxxlWidth } from "../../constant";
import useWindowDimensions from "../hook/useWindowDimension";
import MiniSliderItem from "./MiniSliderItem";

const MiniSlider = ({ type, kind }) => {
  const endpoint = !!kind && !!type && `${Url}${type}${APIkey}`;
  const [datas, setDatas] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [slides, setSlides] = useState(4);
  const { width } = useWindowDimensions();

  useEffect(() => {
    if (width >= xxxlWidth) {
      setSlides(5);
    } else if (width >= xlWidth) {
      setSlides(4);
    } else if (width >= xsWidth) {
      setSlides(3);
    }
  }, [width]);

  useEffect(() => {
    setIsLoading(false);
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => setDatas(data.results));
    setTimeout(() => {
      setIsLoading(true);
    }, 250);
  }, [endpoint, kind]);
  // console.log(datas);
  return (
    <Fragment>
      <Swiper
        grabCursor="true"
        spaceBetween={slides === 3 ? 15 : 25}
        slidesPerView={slides}
        scrollbar={{ draggable: true }}
        modules={[Scrollbar, A11y]}
      >
        {datas?.length > 0 &&
          datas.map((data) => (
            <SwiperSlide key={data.id}>
              <MiniSliderItem
                data={data}
                kind={kind}
                isLoading={isLoading}
              ></MiniSliderItem>
            </SwiperSlide>
          ))}
      </Swiper>
    </Fragment>
  );
};

export default MiniSlider;
