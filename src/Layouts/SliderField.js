import React from "react";
import MiniSlider from "../Components/miniSliders/MiniSlider";
import PropTypes from "prop-types";

const SliderField = ({ kind, type, title }) => {
  if (!kind || !type || !title) return null;
  return (
    <div className="w-full mb-5">
      <h1 className="mb-5 text-xl font-semibold leading-[30px] text-primarySidebarText">
        {title}
      </h1>
      <MiniSlider kind={kind} type={type}></MiniSlider>
    </div>
  );
};

SliderField.propTypes = {
  type: PropTypes.string.isRequired,
  kind: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default SliderField;
