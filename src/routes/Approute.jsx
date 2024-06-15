import React from 'react';
import { Route, Routes} from 'react-router-dom';
import Login from '../pages/Auth/Login';
import Home from '../pages/Home/Home';
import MovieCategory from '../pages/MovieByCategory/MovieByCategory';
import MovieDetail from '../pages/MovieDetail/MovieDetail';
import CategoryMovies from '../pages/CategoryMovie/CategoryMovie';
import MovieNew from '../pages/MovieNew/MovieNew';
import WatchMovie from '../pages/WatchMovie/WatchMovie';
import ActorListSidebar from '../components/Sidebar/ActorListSidebar';
import RandomMovieSidebar from '../components/Sidebar/RandomMovieSidebar';
import CountryMovies from '../pages/CountryMovie/CountryMovie';
import Profile from '../pages/User/Profile/Profile';
import SavedMoviesPage from '../pages/User/SavedMovie/SavedMoviesPage';
import NotFound from '../components/Error/NotFound';
import OTPVerification from '../pages/Auth/OTPVerification';
import ForgotPassword from '../pages/Auth/ForgotPassword';
import BoughtMoviesPage from '../pages/User/BoughtMovies/BoughtMovies';
import SearchResults from '../pages/SearchMovie/SearchResults';
import ResultBuyMovie from '../pages/BuyMovie/ResultBuyMovie.jsx';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      {/* <Route path="/" element={<Login />} /> */}
      {/* <Route path="/register" element={<SignUp/>} /> */}
      <Route path="/otp-verification" element={<OTPVerification/>} />
      <Route path="/" element={<Home />} />
      <Route path="/phim-moi" element={<MovieNew />} />
      <Route path="/phim-le" element={<MovieCategory categoryId={1} />} />
      <Route path="/phim-bo" element={<MovieCategory categoryId={2} />} />  
      <Route path="/the-loai/:categoryId" element={<CategoryMovies/>} />
      <Route path="/quoc-gia/:countryId" element={<CountryMovies/>} />
      <Route path="/actor" element={<ActorListSidebar />} />
      <Route path="/random" element={<RandomMovieSidebar />} />  
      <Route path="/profile" element={<Profile />} />
      <Route path="/movie/:movieId" element={<MovieDetail />} />
      <Route path="/watch/:movieId/:episodeId" element={<WatchMovie/>} />
      <Route path="/saved-movies"  element={<SavedMoviesPage />} />
      <Route path="/bought-movies" element={<BoughtMoviesPage />} />
      <Route path="/search-results" element={<SearchResults />} />
      <Route path="*" element={<NotFound />} />
      {/* <Route path="/api/payment/vnpay/return" element={<ResultBuyMovie />} /> */}
    </Routes>
  );
};

export default AppRoutes;