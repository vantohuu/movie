import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAllMoviesByCountry, getCountryNameById } from '../../Utils/api';
import MovieCard from '../../components/Movie/MovieCard';
import { Pagination } from 'react-bootstrap';

// import './CountryMovie.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

function CountryMovies() {
    const { countryId } = useParams();
    const [movies, setMovies] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [countryName, setCountryName] = useState("");
    const moviesPerPage = 5; // Số phim mỗi trang

    useEffect(() => {
        getAllMoviesByCountry(countryId)
            .then(movies => setMovies(movies))
            .catch(error => console.error('Error fetching movies:', error));

        const fetchCountryName = async () => {
            try {
                const countryName = await getCountryNameById(countryId);
                setCountryName(countryName);
            } catch (error) {
                console.error('Error fetching country name:', error);
            }
        };
        fetchCountryName();
    }, [countryId]);

    // Tính toán số lượng trang
    const pageCount = Math.ceil(movies.length / moviesPerPage);

    // Hàm thay đổi trang
    const changePage = (page) => {
        setPageNumber(page);
    };

    // Hiển thị phim trên trang hiện tại
    const displayedMovies = movies
        .slice(pageNumber * moviesPerPage, (pageNumber + 1) * moviesPerPage)
        .map(movie => <MovieCard key={movie.id} movie={movie} />);

    return (
        <div className='mainBody'>
            <Header />
            <div>
                <h2>Danh sách phim của quốc gia {countryName}</h2>
                <div className="movie-list">
                    {displayedMovies}
                </div>
                <Pagination>
                    {Array.from({ length: pageCount }, (_, index) => (
                        <Pagination.Item
                            key={index}
                            active={index === pageNumber}
                            onClick={() => changePage(index)}
                        >
                            {index + 1}
                        </Pagination.Item>
                    ))}
                </Pagination>
            </div>
            <Footer />
        </div>
    );
}

export default CountryMovies;
