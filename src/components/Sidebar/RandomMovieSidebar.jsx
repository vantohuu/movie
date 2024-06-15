import React, { useEffect, useState } from 'react';
import { getMoviesRandom } from '../../Utils/api';
import './RandomMovieSidebar.css';

const RandomMovieSidebar = () => {
  const [randomMovies, setRandomMovies] = useState([]);

  useEffect(() => {
    const fetchRandomMovies = async () => {
      try {
        const randomMoviesData = await getMoviesRandom(5); // Lấy 5 phim ngẫu nhiên
        setRandomMovies(randomMoviesData);
      } catch (error) {
        console.error('Error fetching random movies:', error);
      }
    };

    fetchRandomMovies();
  }, []);

  return (
    <div className='random-movie-sidebar'>
      <h2 className='random-movie-title'>Phim ngẫu nhiên bạn sẽ thích</h2>
      <ul className='random-movie-list'>
        {randomMovies.map(movie => (
          <li key={movie.id} className='random-movie-item'>
            <a href={`/phim/${movie.id}`} className='random-movie-link'>{movie.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RandomMovieSidebar;
