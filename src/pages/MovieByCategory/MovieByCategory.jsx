import React, { useEffect, useState } from 'react';
import { Button, Card, Pagination } from 'react-bootstrap'; // Import components from react-bootstrap
import { Link } from 'react-router-dom';
import { getAllMoviesByCategory, getCategoryNameById } from '../../Utils/api';
import './MovieCategory.css'
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const MovieCategory = ({ categoryId }) => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(2); // Number of movies per page
  const [categoryName, setCategoryName] = useState(""); // State to store category name

  useEffect(() => {
    const fetchMoviesByCategory = async () => {
      try {
        const moviesData = await getAllMoviesByCategory(categoryId);
        setMovies(moviesData);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    // Example: Fetch category name from API based on categoryId
    const fetchCategoryName = async () => {
      try {
        // Assume you have a function to fetch category name by categoryId
        const categoryName = await getCategoryNameById(categoryId);
        setCategoryName(categoryName);
      } catch (error) {
        console.error('Error fetching category name:', error);
      }
    };

    fetchMoviesByCategory();
    fetchCategoryName();
  }, [categoryId]);

  // Calculate indexes of the first and last movie on each page
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  // Handle pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // // Redirect to all movies page
  // const redirectToAllMovies = () => {
  //   window.location.href = `/category/${categoryId}/movies`;
  // };

  return (
    <div className='mainBody'>
      <Header/>
      
    <div>
      <h2>Danh sách phim thể loại {categoryName}</h2>
      <div className="movie-container">
        {currentMovies.map(movie => (
          <Link to={`/movie/${movie.movieId}`}>
          <Card key={movie.id} className="movie-card">
            <Card.Img variant="top" src={movie.image} alt={movie.name} className="movie-image" />
            <Card.Body>
              <Card.Title>{movie.name}</Card.Title>
              <Card.Text>
                Lượt xem: {movie.views}
              </Card.Text>
              {/* <Button variant="primary">Xem ngay</Button> */}
            </Card.Body>
          </Card>
          </Link>
        ))}
      </div>
      <Pagination>
        {Array.from({ length: Math.ceil(movies.length / moviesPerPage) }).map((_, index) => (
          <Pagination.Item key={index} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
      {/* <Button onClick={redirectToAllMovies}>Xem tất cả</Button> Add view all button */}
    </div>

    <Footer/>
    </div>
  );
};

export default MovieCategory;