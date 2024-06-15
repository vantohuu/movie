// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { getAllMoviesByCategory, getCategoryNameById } from '../../Utils/api';
// import MovieCard from '../../components/Movie/MovieCard';
// import ReactPaginate from 'react-paginate';
// import './CategoryMovie.css'
// import Header from '../../components/Header/Header';
// import Footer from '../../components/Footer/Footer';

// function CategoryMovies() {
//     const { categoryId } = useParams();
//     const [movies, setMovies] = useState([]);
//     const [pageNumber, setPageNumber] = useState(0);
//     const [categoryName, setCategoryName] = useState("");
//     const moviesPerPage = 10; // Số phim mỗi trang

//     useEffect(() => {
//         getAllMoviesByCategory(categoryId)
//             .then(movies => setMovies(movies))
//             .catch(error => console.error('Error fetching movies:', error));

//             const fetchCategoryName = async () => {
//                 try {
//                   // Assume you have a function to fetch category name by categoryId
//                   const categoryName = await getCategoryNameById(categoryId);
//                   setCategoryName(categoryName);
//                 } catch (error) {
//                   console.error('Error fetching category name:', error);
//                 }
//               };
//               fetchCategoryName();
//     }, [categoryId]);

//     const pageCount = Math.ceil(movies.length / moviesPerPage);

//     const changePage = ({ selected }) => {
//         setPageNumber(selected);
//     };

//     const displayedMovies = movies
//         .slice(pageNumber * moviesPerPage, (pageNumber + 1) * moviesPerPage)
//         .map(movie => <MovieCard key={movie.id} movie={movie} />);

//     return (
//     <div className='mainBody'>
//       <Header/>
      
//         <div>
//             <h2>Danh sách phim thể loại {categoryName}</h2>
//             <div className="movie-list">
//                 {displayedMovies}
//             </div>
//             <ReactPaginate
//                 previousLabel={'<'}
//                 nextLabel={'>'}
//                 pageCount={pageCount}
//                 onPageChange={changePage}
//                 containerClassName={'pagination'}
//                 previousLinkClassName={'pagination__link'}
//                 nextLinkClassName={'pagination__link'}
//                 disabledClassName={'pagination__link--disabled'}
//                 activeClassName={'pagination__link--active'}
//             />
//         </div>
//         <Footer/>
//     </div>
//     );
// }

// export default CategoryMovies;






import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAllMoviesByCategory, getCategoryNameById } from '../../Utils/api';
import MovieCard from '../../components/Movie/MovieCard';
import { Pagination } from 'react-bootstrap';
import './CategoryMovie.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

function CategoryMovies() {
    const { categoryId } = useParams();
    const [movies, setMovies] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [categoryName, setCategoryName] = useState("");
    const moviesPerPage = 5; // Số phim mỗi trang

    useEffect(() => {
        getAllMoviesByCategory(categoryId)
            .then(movies => setMovies(movies))
            .catch(error => console.error('Error fetching movies:', error));

        const fetchCategoryName = async () => {
            try {
                const categoryName = await getCategoryNameById(categoryId);
                setCategoryName(categoryName);
            } catch (error) {
                console.error('Error fetching category name:', error);
            }
        };
        fetchCategoryName();
    }, [categoryId]);

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
                <h2>Danh sách phim thể loại {categoryName}</h2>
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

export default CategoryMovies;













// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { getAllMoviesByCategory, getCategoryNameById } from '../../Utils/api';
// import MovieCard from '../../components/Movie/MovieCard';
// import { Pagination } from 'react-bootstrap';
// import './CategoryMovie.css';
// import Header from '../../components/Header/Header';
// import Footer from '../../components/Footer/Footer';

// function CategoryMovies() {
//     const { categoryId } = useParams();
//     const [movies, setMovies] = useState([]);
//     const [pageNumber, setPageNumber] = useState(0);
//     const [categoryName, setCategoryName] = useState("");
//     const moviesPerPage = 6; // Số phim mỗi trang

//     useEffect(() => {
//         getAllMoviesByCategory(categoryId)
//             .then(movies => setMovies(movies))
//             .catch(error => console.error('Error fetching movies:', error));

//         const fetchCategoryName = async () => {
//             try {
//                 const categoryName = await getCategoryNameById(categoryId);
//                 setCategoryName(categoryName);
//             } catch (error) {
//                 console.error('Error fetching category name:', error);
//             }
//         };
//         fetchCategoryName();
//     }, [categoryId]);

//     // Tính toán số lượng trang
//     const pageCount = Math.ceil(movies.length / moviesPerPage);

//     // Hàm thay đổi trang
//     const changePage = (page) => {
//         setPageNumber(page);
//     };

//     // Hiển thị phim trên trang hiện tại
//     const displayedMovies = movies
//         .slice(pageNumber * moviesPerPage, (pageNumber + 1) * moviesPerPage)
//         .map(movie => <MovieCard key={movie.id} movie={movie} />);

//     return (
//         <div className='mainBody'>
//             <Header />
//             <div>
//                 <h2>Danh sách phim thể loại {categoryName}</h2>
//                 <div className="movie-list">
//                     {displayedMovies}
//                 </div>
//                 <Pagination>
//                     <Pagination.First onClick={() => changePage(0)} />
//                     <Pagination.Prev onClick={() => changePage(pageNumber - 1)} disabled={pageNumber === 0} />
//                     {[...Array(pageCount)].map((_, index) => (
//                         <Pagination.Item key={index} active={index === pageNumber} onClick={() => changePage(index)}>
//                             {index + 1}
//                         </Pagination.Item>
//                     ))}
//                     <Pagination.Next onClick={() => changePage(pageNumber + 1)} disabled={pageNumber === pageCount - 1} />
//                     <Pagination.Last onClick={() => changePage(pageCount - 1)} />
//                 </Pagination>
//             </div>
//             <Footer />
//         </div>
//     );
// }

// export default CategoryMovies;
