import React, { useState,useEffect } from 'react';
import { Card} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './MovieCard.css';
import { getMovieDetail } from '../../Utils/api';

const MovieCardBought = ({ movie }) => {
  const movieId = movie.movieId;
  const[phim, setPhim] = useState([{}]);

  useEffect(() => {
   
    const fetchMovieDetail = async () => {
      try {
          const movieDetail = await getMovieDetail(movieId);
          setPhim(movieDetail);
          // setLoading(false);
      } catch (error) {
          console.error('Error fetching movie detail');
          // setLoading(false);
      }
  };

    // fetchBoughtMovies();
    fetchMovieDetail();
}

, [movieId]);
  return (
    <div>
      <Card className="movie-card">
        <Link to={`/movie/${movie.movieId}`} className="movie-link">
          <div className="movie-info">
            {/* <div className="movie-rating">
              {movie.star}/5 <FontAwesomeIcon icon={faStar} />
            </div> */}
          
            {/* {phim.price === 0 ? (
              <div className="movie-rating">Free</div>
            ) : (
              <div className="movie-rating">
                {phim.price} <FontAwesomeIcon icon={faCoins} />
              </div>
            )} */}
            {phim.episodes === 1 ? (
              <div className="movie-views"><div className="movie-category">Full</div></div>
            ) : null}
          </div>
        
          <Card.Img variant="top" src={`${process.env.REACT_APP_UPLOAD_URL}/${movie.imageMovie}`} alt={movie.movieName} className="movie-image" />
          {/* <Card.Img variant="top" src={`${process.env.REACT_APP_UPLOAD_URL}/${movie.imageMovie || 'temp.jpg'}`} alt={movie.movieName} className="movie-image" /> */}

          <Card.Body>
            <Card.Title className="movie-name">{movie.name||movie.movieName}</Card.Title>
          </Card.Body>
        </Link>
      </Card>

    </div>
  );
};

export default MovieCardBought;