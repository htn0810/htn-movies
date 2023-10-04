import React, { useEffect, useState } from "react";
import GenresCategoryField from "../Layouts/GenresCategoryField";
import SliderField from "../Layouts/SliderField";
import ResultsFilterCategory from "../Layouts/ResultsFilterCategory";
import { useSidebarCategory } from "../Contexts/SidebarCategoryContext";

const MoviesPage = () => {
  const [genreId, setGenreId] = useState([]);
  const { setFocusOneCategory } = useSidebarCategory();
  useEffect(() => {
    document.title = "Movies";
    setFocusOneCategory([1, 0, 1, 1]);
  }, [setFocusOneCategory]);

  return (
    <div className="flex w-full h-full text-white">
      <div className="flex-1 w-2/3 h-full xl:mr-10 sm:mr-5">
        {genreId.length > 0 ? (
          <div className="flex items-center justify-center flex-1 w-full h-full">
            <ResultsFilterCategory
              kind="movie"
              genreId={genreId}
            ></ResultsFilterCategory>
          </div>
        ) : (
          <div className="flex-1 w-full h-full">
            <SliderField
              type="/discover/movie?"
              kind="movie"
              title="LATEST"
            ></SliderField>
            <SliderField
              type="/trending/movie/week?"
              kind="movie"
              title="TRENDING"
            ></SliderField>
            <SliderField
              type="/movie/top_rated?"
              kind="movie"
              title="TOP RATED"
            ></SliderField>
            <SliderField
              type="/movie/now_playing?"
              kind="movie"
              title="NOW PLAYING"
            ></SliderField>
            <SliderField
              type="/movie/upcoming?"
              kind="movie"
              title="UPCOMING"
            ></SliderField>
          </div>
        )}
      </div>
      <div className="w-[250px] xs:hidden sm:block">
        <GenresCategoryField
          type="movie"
          setGenreId={setGenreId}
          genreId={genreId}
        ></GenresCategoryField>
      </div>
    </div>
  );
};

export default MoviesPage;
