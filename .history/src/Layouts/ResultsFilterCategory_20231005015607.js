import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import MiniSliderItem from "../Components/miniSliders/MiniSliderItem";
import { APIkey, lgWidth, xlWidth, xsWidth } from "../constant";
import Pagination from "react-responsive-pagination";
import "../pagination.css";
import "react-loading-skeleton/dist/skeleton.css";
import useWindowDimensions from "../Components/hook/useWindowDimension";

const ResultsFilterCategory = ({ genreId, kind }) => {
  const [moviesFilter, setMoviesFilter] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { width } = useWindowDimensions();

  const [maxWidthPagination, setMaxWidthPagination] = useState();
  const endpoint = `https://api.themoviedb.org/3/discover/${kind}?${APIkey}&with_genres=${genreId.toString()}&page=${pageCount}`;
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsLoading(false);
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        setMoviesFilter(data.results);
        setTotalPage(data.total_pages);
      });
    setTimeout(() => {
      setIsLoading(true);
    }, 250);
  }, [endpoint, pageCount]);
  useEffect(() => {
    setPageCount(1);
  }, [genreId?.length]);

  useEffect(() => {
    if (width >= xlWidth) {
      setMaxWidthPagination(450);
    } else if (width >= lgWidth) {
      setMaxWidthPagination(350);
    } else if (width >= xsWidth) {
      setMaxWidthPagination(200);
    }
  }, [width]);

  const handlePageClick = (event) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setPageCount(Math.ceil(event));
  };
  return (
    <div className="min-h-[1000px] mt-[50px] flex justify-between lg:gap-x-3 xs:gap-3 gap-y-10 flex-wrap">
      <Fragment>
        <div className="grid grid-flow-row-dense xxxl:grid-cols-5 xl:grid-cols-4 gap-x-10 gap-y-6">
          {moviesFilter?.length > 0 &&
            moviesFilter.map((movie) => (
              <MiniSliderItem
                key={movie.id}
                kind={kind}
                data={movie}
                isLoading={isLoading}
              ></MiniSliderItem>
            ))}
        </div>
        <div className="w-full mx-auto mt-10 pagination">
          <Pagination
            onPageChange={handlePageClick}
            total={Math.ceil(totalPage >= 500 ? 500 : totalPage)}
            current={pageCount}
            maxWidth={maxWidthPagination}
          />
        </div>
      </Fragment>
    </div>
  );
};

ResultsFilterCategory.propTypes = {
  kind: PropTypes.string.isRequired,
  genreId: PropTypes.array.isRequired,
};
export default ResultsFilterCategory;
