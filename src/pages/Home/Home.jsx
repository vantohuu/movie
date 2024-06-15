import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { getMoviesForHomePage } from '../../Utils/api';
import './Home.css';
import MovieCard from '../../components/Movie/MovieCard';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { Link } from 'react-router-dom';
import Slider from '../../components/Slider/Slider';

const Home = () => {
  const [phimLe, setPhimLe] = useState([]);
  const [phimBo, setPhimBo] = useState([]);
  const [phimMoi, setPhimMoi] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moiResponse = await getMoviesForHomePage('moi');
        const leResponse = await getMoviesForHomePage('le');
        const boResponse = await getMoviesForHomePage('bo');

        setPhimMoi(moiResponse);
        setPhimLe(leResponse);
        setPhimBo(boResponse);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="mainBody">
      <Header />
      <div className="home-container">
        <div className="movie-section">
          <h2>
            Phim mới cập nhật
            <Button onClick={() => (window.location.href = '/phim-moi')} className="view-all-button">
              Xem tất cả
            </Button>
          </h2>
          <Slider>
            {phimMoi.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </Slider>
        </div>

        <div className="movie-section">
          <h2>
            Phim lẻ
            {/* <Button onClick={() => (window.location.href = '/phim-le')} className="view-all-button">
              Xem tất cả
            </Button> */}
            <Link to="/the-loai/1">
              <Button className="view-all-button">Xem tất cả</Button>
            </Link>
          </h2>
          <Slider>
            {phimLe.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </Slider>
        </div>

        <div className="movie-section">
          <h2>
            Phim bộ
            <Link to="/the-loai/2">
              <Button className="view-all-button">Xem tất cả</Button>
            </Link>
          </h2>
          <Slider>
            {phimBo.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </Slider>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
