import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { APIkey } from "../../constant";

const DetailsTrailerVideo = ({ dataId, kind }) => {
  const endpoint =
    !!kind &&
    !!dataId &&
    `https://api.themoviedb.org/3/${kind}/${dataId}/videos?${APIkey}`;
  const [dataTrailers, setDataTrailers] = useState();
  useEffect(() => {
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        setDataTrailers(data.results);
      });
  }, [endpoint]);
  const trailers =
    dataTrailers?.length > 0 &&
    dataTrailers.filter(
      (data) => data.type === "Trailer" && data.official === true
    );
  return (
    <Fragment>
      {trailers?.length > 0 ? (
        <iframe
          className="w-full lg:h-[550px] md:h-[450px] sm:h-[400px] xs:h-[350px] rounded-lg"
          height="506"
          src={`https://www.youtube.com/embed/${trailers[0]?.key}`}
          frameborder={0}
          title="Trailer"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      ) : (
        <iframe
          className="w-full h-[550px] rounded-lg"
          height="506"
          src={`https://www.youtube.com/embed/${
            dataTrailers?.length > 0 ? dataTrailers[0]?.key : ""
          }`}
          frameborder="0"
          title="Trailer"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      )}
    </Fragment>
  );
};

DetailsTrailerVideo.propTypes = {
  dataId: PropTypes.number,
  kind: PropTypes.string,
};

export default DetailsTrailerVideo;
