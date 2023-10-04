import React, { Fragment, useEffect, useState } from "react";
import { A11y, Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { APIkey, HeaderUrl, xlWidth, xsWidth } from "../../constant";
import PropTypes from "prop-types";
import useWindowDimensions from "../hook/useWindowDimension";

const DetailsCast = ({ dataId, kind }) => {
  const endpoint =
    !!kind &&
    !!dataId &&
    `https://api.themoviedb.org/3/${kind}/${dataId}/credits?${APIkey}`;
  const [dataCasts, setDataCasts] = useState([]);
  const [slides, setSlides] = useState(4);
  const { width } = useWindowDimensions();

  useEffect(() => {
    if (width >= xlWidth) {
      setSlides(4);
    } else if (width >= xsWidth) {
      setSlides(3);
    }
  }, [width]);

  useEffect(() => {
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        setDataCasts(data.cast);
      });
  }, [endpoint]);

  const casts =
    dataCasts?.length > 0 &&
    dataCasts?.filter((dataCast) => dataCast.profile_path !== null);
  if (casts === false) return null;
  return (
    <Fragment>
      <div className="w-full py-5 rounded-lg bg-secondaryColorBg">
        <h1 className="w-full text-center mb-5 lg:text-2xl sm:text-xl xs:text-lg font-semibold leading-[30px] text-primarySidebarText">
          CAST
        </h1>
        <Swiper
          grabCursor="true"
          spaceBetween={slides === 3 ? 15 : 25}
          slidesPerView={slides}
          scrollbar={{ draggable: true }}
          modules={[Scrollbar, A11y]}
        >
          {casts?.length > 0 &&
            casts.map((cast) => (
              <SwiperSlide key={cast?.original_name}>
                <div className="lg:w-[240px] lg:h-[330px] sm:w-[207px] xs:w-[160px] sm:h-[280px]  xs:h-[250px] relative overflow-hidden rounded-lg item-minislider-wrapper cursor-pointer">
                  <img
                    src={`${HeaderUrl}${cast?.profile_path}`}
                    className="object-cover w-full h-full transition-all rounded-lg"
                    alt=""
                  />
                  <div className="absolute top-0 left-0 w-full h-full rounded-lg bg-overlay"></div>
                  <div className=" absolute bottom-0 left-0 w-full hover:line-clamp-none line-clamp-1 bg-[rgba(0,0,0,.6)] text-center rounded-b-lg px-2 py-2 text-mainColor  font-medium text-lg leading-8">
                    {cast?.original_name}
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </Fragment>
  );
};

DetailsCast.propTypes = {
  dataId: PropTypes.number,
  kind: PropTypes.string,
};

export default DetailsCast;
