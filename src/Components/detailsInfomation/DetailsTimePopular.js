import React, { Fragment } from "react";
import PropTypes from "prop-types";

const DetailsTimePopular = ({ data, kind }) => {
  const dataTime = data?.runtime || data?.last_episode_to_air?.runtime;
  let minutesTime = 0;
  let hoursTime = 0;
  if (dataTime > 60) {
    hoursTime = Math.floor(dataTime / 60);
    minutesTime = dataTime - hoursTime * 60;
  } else {
    minutesTime = dataTime;
  }
  return (
    <Fragment>
      <div className="flex items-center w-full lg:text-xl sm:text-base xs:text-xs">
        <div className="flex-1 ">
          <span className="mr-3">Release:</span>
          <span>{data?.release_date || data?.last_air_date}</span>
          {minutesTime && (
            <Fragment>
              <span className="mx-3">
                <i className="bx bx-dots-horizontal-rounded"></i>
              </span>
              <div className="inline-block">
                <span className="mr-3">Time:</span>
                {hoursTime !== 0 && <span>{`${hoursTime}h-`}</span>}
                <span className="">{`${minutesTime}'`}</span>
              </div>
            </Fragment>
          )}
        </div>
        {kind === "tv" && (
          <div className="px-5 py-3 mr-3 rounded-lg md:mt-0 bg-hoverColorBg lg:text-xl sm:text-base xs:text-xs">
            <span className="mr-3">Episodes</span>
            <span>{`#${data?.last_episode_to_air?.episode_number}`}</span>
          </div>
        )}
        {kind !== "tv" && (
          <div className="py-3 rounded-lg md:mt-0 md:px-5 xs:px-2 bg-hoverColorBg lg:text-xl sm:text-base xs:text-xs">
            <span className="mr-3">Popular</span>
            <span>{`#${data?.popularity.toFixed(1)}`}</span>
          </div>
        )}
      </div>

      <div className="flex flex-col items-center">
        <h2 className="my-5 text-primarySidebarText lg:text-4xl sm:text-2xl xs:text-xl">
          Overview
        </h2>
        <p className="lg:text-[20px] text-secondarySidebarText font-normal lg:leading-[30px] sm:text-[16px] sm:leading-[26px] xs:text-[14px] xs:leading-[22px]">
          {data?.overview}
        </p>
      </div>
    </Fragment>
  );
};
DetailsTimePopular.propTypes = {
  data: PropTypes.object,
  kind: PropTypes.string,
};

export default DetailsTimePopular;
