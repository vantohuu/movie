// components/SearchResultItem/SearchResultItem.js
import React from 'react';
import { Link } from 'react-router-dom';
import './SearcMovieItem.css';

function SearchResultItem({ movie }) {
    return (
        <li className="search-result-item">
            <Link to={`/movie/${movie.movieId}`} className="search-result-link">
                <img src={`${process.env.REACT_APP_UPLOAD_URL}/${movie.image}`} alt={movie.name} className="search-result-image" />
                <span className="search-result-name">{movie.name}</span>
            </Link>
        </li>
    );
}

export default SearchResultItem;