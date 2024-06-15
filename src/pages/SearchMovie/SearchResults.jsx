import React from 'react';
import { useLocation } from 'react-router-dom';
import MovieCard from '../../components/Movie/MovieCard';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

function SearchResults() {
    const location = useLocation();
    const searchResults = location.state?.results || [];

    return (
        <div className='mainBody'>
            <Header />
            <div>
                <h2>Kết quả tìm kiếm</h2>
                <div className="movie-list">
                    {searchResults.length > 0 ? (
                        searchResults.map(movie => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))
                    ) : (
                        <p>Không tìm thấy kết quả nào.</p>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default SearchResults;









// import React, { useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import MovieCard from '../../components/Movie/MovieCard';
// import Header from '../../components/Header/Header';
// import Footer from '../../components/Footer/Footer';
// import ReactPaginate from 'react-paginate';
// import './SearchResult.css';  // Thêm CSS cho phân trang

// function SearchResults() {
//     const location = useLocation();
//     const searchResults = location.state?.results || [];
//     const [currentPage, setCurrentPage] = useState(0);

//     const itemsPerPage = 10;  // Số lượng kết quả trên mỗi trang
//     const offset = currentPage * itemsPerPage;
//     const currentItems = searchResults.slice(offset, offset + itemsPerPage);
//     const pageCount = Math.ceil(searchResults.length / itemsPerPage);

//     const handlePageClick = ({ selected }) => {
//         setCurrentPage(selected);
//     };

//     return (
//         <div className='mainBody'>
//             <Header />
//             <div>
//                 <h2>Kết quả tìm kiếm</h2>
//                 <div className="movie-list">
//                     {currentItems.length > 0 ? (
//                         currentItems.map(movie => (
//                             <MovieCard key={movie.id} movie={movie} />
//                         ))
//                     ) : (
//                         <p>Không tìm thấy kết quả nào.</p>
//                     )}
//                 </div>
//                 <ReactPaginate
//                     previousLabel={'Trước'}
//                     nextLabel={'Sau'}
//                     breakLabel={'...'}
//                     breakClassName={'break-me'}
//                     pageCount={pageCount}
//                     marginPagesDisplayed={2}
//                     pageRangeDisplayed={5}
//                     onPageChange={handlePageClick}
//                     containerClassName={'pagination'}
//                     activeClassName={'active'}
//                 />
//             </div>
//             <Footer />
//         </div>
//     );
// }

// export default SearchResults;
