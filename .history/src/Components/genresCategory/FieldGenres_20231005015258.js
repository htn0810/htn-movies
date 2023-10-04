import React from "react";
import PropTypes from "prop-types";

const FieldGenres = ({ genreData, setGenreId, genreId }) => {
  const handleSetGenreId = (id) => {
    console.log(id);
    if (genreId.includes(id)) {
      const newGenres = genreId.filter((data) => data !== id);
      setGenreId(newGenres);
    } else {
      setGenreId([...genreId, id]);
    }
  };

  return (
    <div className="flex items-center justify-between w-full font-medium text-[18px] leading-[22px] py-5 border-b-2 border-b-secondarySidebarText">
      <label
        onClick={() => handleSetGenreId(genreData.id)}
        htmlFor={genreData.id}
        className="cursor-pointer"
      >
        {genreData.name}
      </label>
      <input
        id={genreData.id}
        type="checkbox"
        className="w-5 h-5 accent-hoverColorText"
      />
    </div>
  );
};

FieldGenres.propTypes = {
  genreData: PropTypes.object.isRequired,
  genreId: PropTypes.array.isRequired,
  setGenreId: PropTypes.func.isRequired,
};

export default FieldGenres;
