import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AuthenProvider } from "./Contexts/AuthenContext";
import "swiper/css";
import "swiper/css/bundle";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
import HomePage from "./Pages/HomePage";
import MainPage from "./Pages/MainPage";
import MoviesPage from "./Pages/MoviesPage";
import SignInPage from "./Pages/SignInPage";
import SignUpPage from "./Pages/SignUpPage";
import TvSeriesPage from "./Pages/TvSeriesPage";
import SearchPage from "./Pages/SearchPage";
import { SearchInputHeaderProvider } from "./Contexts/SearchInputHeaderContext";
import { SidebarCategoryProvider } from "./Contexts/SidebarCategoryContext";
import DetailsPage from "./Pages/DetailsPage";
import UserInfoPage from "./Pages/UserInfoPage";
import MarkedPage from "./Pages/MarkedPage";

function App() {
  return (
    <AuthenProvider>
      <SearchInputHeaderProvider>
        <SidebarCategoryProvider>
          <BrowserRouter>
            <Routes>
              <Route
                path="/sign-up"
                element={<SignUpPage></SignUpPage>}
              ></Route>
              <Route
                path="/sign-in"
                element={<SignInPage></SignInPage>}
              ></Route>
              <Route path="/" element={<MainPage></MainPage>}>
                <Route path="/" element={<HomePage></HomePage>}></Route>
                <Route
                  path="/movies"
                  element={<MoviesPage></MoviesPage>}
                ></Route>
                <Route
                  path="/tv"
                  element={<TvSeriesPage></TvSeriesPage>}
                ></Route>
                <Route
                  path="/marked"
                  element={<MarkedPage></MarkedPage>}
                ></Route>
                <Route
                  path="/search"
                  element={<SearchPage></SearchPage>}
                ></Route>
                <Route
                  path="/details"
                  element={<DetailsPage></DetailsPage>}
                ></Route>
                <Route
                  path="/user-info"
                  element={<UserInfoPage></UserInfoPage>}
                ></Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </SidebarCategoryProvider>
      </SearchInputHeaderProvider>
    </AuthenProvider>
  );
}

export default App;
