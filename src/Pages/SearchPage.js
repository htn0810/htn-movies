import React, { useEffect, useState } from "react";
import Pagination from "react-responsive-pagination";
import "../pagination.css";
import { useNavigate } from "react-router-dom";
import MiniSliderItem from "../Components/miniSliders/MiniSliderItem";
import {
  APIkey,
  lgWidth,
  mdWidth,
  smWidth,
  xlWidth,
  xsWidth,
} from "../constant";
import { useSearchInput } from "../Contexts/SearchInputHeaderContext";
import { useSidebarCategory } from "../Contexts/SidebarCategoryContext";
import useWindowDimensions from "../Components/hook/useWindowDimension";

const SearchPage = () => {
  const navigate = useNavigate();
  const { width } = useWindowDimensions();
  const [maxWidthPagination, setMaxWidthPagination] = useState();
  const { setFocusOneCategory } = useSidebarCategory();
  const [movieTvSearch, setMovieTvSearch] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { inputSearchValue, dropdownName } = useSearchInput();
  if (dropdownName === "Kind...?" && inputSearchValue.trim() === "") {
    navigate("/");
  }
  const endpoint = `https://api.themoviedb.org/3/search/${dropdownName.toLowerCase()}?${APIkey}&query=${inputSearchValue.toLowerCase()}&page=${pageCount}`;
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsLoading(false);
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setMovieTvSearch(data.results);
        setTotalPage(data.total_pages);
      });
    setTimeout(() => {
      setIsLoading(true);
    }, 250);
  }, [endpoint, pageCount]);

  useEffect(() => {
    setPageCount(1);
  }, [inputSearchValue, dropdownName]);
  const handlePageClick = (event) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setPageCount(Math.ceil(event));
  };

  useEffect(() => {
    if (width >= xlWidth) {
      setMaxWidthPagination(700);
    } else if (width >= lgWidth) {
      setMaxWidthPagination(550);
    } else if (width >= mdWidth) {
      setMaxWidthPagination(450);
    } else if (width >= smWidth) {
      setMaxWidthPagination(350);
    } else if (width >= xsWidth) {
      setMaxWidthPagination(250);
    }
  }, [width]);

  useEffect(() => {
    setFocusOneCategory([1, 1, 1, 1]);
  }, [setFocusOneCategory]);

  return (
    <div className="w-full h-full text-white">
      <div className="flex flex-wrap justify-center w-full h-full gap-y-8 md:gap-x-8 xs:gap-x-2">
        {movieTvSearch?.length > 0 ? (
          movieTvSearch.map((movieTvData) => (
            <MiniSliderItem
              key={movieTvData.id}
              kind={dropdownName.toLowerCase()}
              data={movieTvData}
              isLoading={isLoading}
            ></MiniSliderItem>
          ))
        ) : (
          <div className="w-full mt-10 text-3xl font-semibold text-center text-hoverColorText">
            Not Found
          </div>
        )}
      </div>

      <div className="w-full mx-auto mt-10 pagination">
        {movieTvSearch?.length > 0 && (
          <Pagination
            onPageChange={handlePageClick}
            total={Math.ceil(totalPage >= 500 ? 500 : totalPage)}
            current={pageCount}
            maxWidth={maxWidthPagination}
          />
        )}
      </div>
    </div>
  );
};

export default SearchPage;
