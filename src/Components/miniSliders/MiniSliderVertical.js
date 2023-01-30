import React, { Fragment, useEffect, useState } from "react";
import SwiperCore, { Mousewheel } from "swiper/core";
import { Swiper, SwiperSlide } from "swiper/react";
import { APIkey, Url } from "../../constant";
import MiniSliderItemVertical from "./MiniSliderItemVertical";
import { A11y, Scrollbar } from "swiper";
import Skeleton from "react-loading-skeleton";

SwiperCore.use([Mousewheel]);

const MiniSliderVertical = ({ type, kind }) => {
  const endpoint = `${Url}${type}${APIkey}`;
  const [datas, setDatas] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false);
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => setDatas(data.results.slice(0, 10)));
    setTimeout(() => {
      setIsLoading(true);
    }, 250);
  }, [endpoint]);
  // console.log(datas);
  return (
    <Fragment>
      {isLoading ? (
        <Swiper
          className="vertical"
          modules={[Scrollbar, A11y]}
          spaceBetween={0}
          slidesPerView={3}
          mousewheel={true}
          direction="vertical"
          scrollbar={{ draggable: true }}
        >
          {datas?.length > 0 &&
            datas.map((data) => (
              <SwiperSlide className="vertical" key={data.id}>
                <MiniSliderItemVertical
                  data={data}
                  kind={kind}
                  isLoading={isLoading}
                ></MiniSliderItemVertical>
              </SwiperSlide>
            ))}
        </Swiper>
      ) : (
        <Skeleton
          variant="rectangular"
          animation="wave"
          baseColor="#202020"
          highlightColor="#333333"
          className="w-full h-[900px] rounded-lg "
        />
      )}
    </Fragment>
  );
};

export default MiniSliderVertical;
