// // MovieNew.jsx
// import React, { useEffect, useState } from 'react';
// import { getNewMovies } from '../../Utils/api';
// import MovieCard from '../../components/Movie/MovieCard';
// import Header from '../../components/Header/Header';
// import Footer from '../../components/Footer/Footer';

// function MovieNew() {
//     const [newMovies, setNewMovies] = useState([]);

//     useEffect(() => {
//         // Gọi hàm API để lấy danh sách phim mới nhất
//         getNewMovies(20) // Lấy 10 phim mới nhất (số lượng có thể điều chỉnh)
//             .then(movies => setNewMovies(movies))
//             .catch(error => console.error('Error fetching new movies:', error));
//     }, []);

//     return (
//     <div className='mainBody'>
//       <Header/>
      
//         <div>
//             <h2>Phim mới nhất</h2>
//             <div className="movie-list">
//                 {newMovies.map(movie => (
//                     <MovieCard key={movie.id} movie={movie} />
//                 ))}
//             </div>
//         </div>

//         <Footer/>
//     </div>
//     );
// }

// export default MovieNew;




















// MovieNew.jsx
import React, { useEffect, useState } from 'react';
import { getNewMovies } from '../../Utils/api';
import MovieCard from '../../components/Movie/MovieCard';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { Pagination } from 'react-bootstrap';

function MovieNew() {
    const [newMovies, setNewMovies] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const moviesPerPage = 5; // Số phim mỗi trang

    useEffect(() => {
        // Gọi hàm API để lấy danh sách phim mới nhất
        getNewMovies(20) // Lấy 20 phim mới nhất (số lượng có thể điều chỉnh)
            .then(movies => setNewMovies(movies))
            .catch(error => console.error('Error fetching new movies:', error));
    }, []);

    // Tính toán số lượng trang
    const pageCount = Math.ceil(newMovies.length / moviesPerPage);

    // Hàm thay đổi trang
    const changePage = (page) => {
        setPageNumber(page);
    };

    // Hiển thị phim trên trang hiện tại
    const displayedMovies = newMovies
        .slice(pageNumber * moviesPerPage, (pageNumber + 1) * moviesPerPage)
        .map(movie => <MovieCard key={movie.id} movie={movie} />);

    return (
        <div className='mainBody'>
            <Header />
            <div>
                <h2>Phim mới nhất</h2>
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

export default MovieNew;
