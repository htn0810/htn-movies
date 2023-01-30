import React, { Fragment, useEffect, useState } from "react";
import { useSidebarCategory } from "../Contexts/SidebarCategoryContext";
import GenresCategoryField from "../Layouts/GenresCategoryField";
import ResultsFilterCategory from "../Layouts/ResultsFilterCategory";
import SliderField from "../Layouts/SliderField";

const TvSeriesPage = () => {
  const { setFocusOneCategory } = useSidebarCategory();
  const [genreId, setGenreId] = useState([]);
  useEffect(() => {
    document.title = "Tv series";
    setFocusOneCategory([1, 1, 0, 1]);
  }, [setFocusOneCategory]);

  return (
    <div className="flex w-full h-full text-white">
      <div className="flex-1 w-2/3 h-full xl:mr-10 sm:mr-5">
        {genreId.length > 0 ? (
          <div className="flex-1 w-full h-full">
            <ResultsFilterCategory
              kind="tv"
              genreId={genreId}
            ></ResultsFilterCategory>
          </div>
        ) : (
          <div className="flex-1 w-full h-full">
            <SliderField
              type="/trending/tv/day?"
              kind="tv"
              title="LATEST"
            ></SliderField>
            <SliderField
              type="/trending/tv/week?"
              kind="tv"
              title="TRENDING"
            ></SliderField>
            <SliderField
              type="/tv/top_rated?"
              kind="tv"
              title="TOP RATED"
            ></SliderField>
            <SliderField
              type="/tv/popular?"
              kind="tv"
              title="POPULAR"
            ></SliderField>
            <SliderField
              type="/tv/airing_today?"
              kind="tv"
              title="AIRING TODAY"
            ></SliderField>
          </div>
        )}
      </div>
      <div className="w-[250px] xs:hidden sm:block">
        <GenresCategoryField
          type="tv"
          setGenreId={setGenreId}
          genreId={genreId}
        ></GenresCategoryField>
      </div>
    </div>
  );
};

export default TvSeriesPage;
