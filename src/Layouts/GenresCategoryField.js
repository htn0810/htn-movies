import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import FieldGenres from "../Components/genresCategory/FieldGenres";
import { movieGenreList, tvGenreList } from "../constant";

const GenresCategoryField = ({ type, setGenreId, genreId }) => {
  const genreList =
    type === "movie" ? movieGenreList : type === "tv" ? tvGenreList : "";
  const [moreGenres, setMoreGenres] = useState(genreList.slice(0, 4));
  const [numberCheckMore, setNumberCheckMore] = useState(0);
  const seeMoreRef = useRef();
  const handleShowMore = () => {
    switch (numberCheckMore) {
      case 0:
        setMoreGenres(genreList.slice(0, 9));
        setNumberCheckMore(1);
        break;
      case 1:
        setMoreGenres(genreList.slice(0, 14));
        setNumberCheckMore(2);
        seeMoreRef.current.style.pointerEvents = "none";
        break;
      default:
        setMoreGenres(genreList.slice(0, 4));
        setNumberCheckMore(0);
        break;
    }
  };
  return (
    <div className="w-full">
      <h1 className="mb-5 text-xl text-center font-semibold leading-[30px] text-primarySidebarText">
        CATEGORY
      </h1>
      <div className="px-5 pb-5 text-center bg-secondaryColorBg rounded-xl">
        {moreGenres.length > 0 &&
          moreGenres.map((genre) => (
            <FieldGenres
              key={genre.id}
              genreData={genre}
              setGenreId={setGenreId}
              genreId={genreId}
            ></FieldGenres>
          ))}

        <div
          ref={seeMoreRef}
          onClick={handleShowMore}
          className="mx-auto mt-5 font-medium cursor-pointer text-secondarySidebarText"
        >
          See more
        </div>
      </div>
    </div>
  );
};

GenresCategoryField.propTypes = {
  type: PropTypes.string.isRequired,
  genreId: PropTypes.array.isRequired,
  setGenreId: PropTypes.func.isRequired,
};

export default GenresCategoryField;
