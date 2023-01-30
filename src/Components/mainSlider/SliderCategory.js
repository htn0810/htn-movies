import React, { Fragment, useEffect, useState } from "react";
import { APIkey } from "../../constant";
import PropTypes from "prop-types";

const SliderCategory = ({ dataId }) => {
  const [categories, setCategories] = useState();
  const endpoint =
    !!dataId && `https://api.themoviedb.org/3/movie/${dataId}?${APIkey}`;
  useEffect(() => {
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.genres.slice(0, 4));
      });
  }, [endpoint]);
  if (!dataId) return null;
  return (
    <Fragment>
      {categories?.length > 0 &&
        categories.map((category) => (
          <span
            key={category.id}
            className="md:p-3 xs:p-1 sm:py-2 mr-3 rounded-lg bg-categoryOverlay md:text-[18px] xs:text-[12px] text-primarySidebarText"
          >
            {category.name}
          </span>
        ))}
    </Fragment>
  );
};

SliderCategory.propTypes = {
  dataId: PropTypes.number,
};

export default SliderCategory;
