
// import React, { useState,useEffect } from 'react';
// import { Card, Modal, Button } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCoins } from '@fortawesome/free-solid-svg-icons';
// import { faStar, faEye } from '@fortawesome/free-solid-svg-icons';
// import './MovieCard.css';
// import { getAllMoviesBoughtByUser } from '../../Utils/api';
// import { getMovieDetail } from '../../Utils/api';
// const MovieCardSaved = ({ movie }) => {
//   const movieId = movie.movieId;
//   const[phim, setPhim] = useState([{}]);
//   const [showPopup, setShowPopup] = useState(false);
//   const [error, setError] = useState('');

//   useEffect(() => {
   
//     const fetchMovieDetail = async () => {
//       try {
//           const movieDetail = await getMovieDetail(movieId);
//           setPhim(movieDetail);
//           // setLoading(false);
//       } catch (error) {
//           setError('Error fetching movie detail');
//           // setLoading(false);
//       }
//   };

//     // fetchBoughtMovies();
//     fetchMovieDetail();
// }

// , []);



//   const handleCardClick = (e) => {
//     if (phim.price > 0) {
//       e.preventDefault();
//       setShowPopup(true);
//     }
//   };

//   const handleClosePopup = () => {
//     setShowPopup(false);
//   };

//   return (
//     <div>
//       <Card className="movie-card">
//         <Link to={`/movie/${phim.movieId}`} className="movie-link" onClick={handleCardClick}>
//           {/* <div className="movie-info">
//             <div className="movie-rating">
//               {phim.star}/5 <FontAwesomeIcon icon={faStar} />
//             </div>
            
//              */}
//           <div className="movie-info">
//             {phim.price === 0 ? (
//               <div className="movie-rating">Free</div>
//             ) : (
//               <div className="movie-rating">
//                 {phim.price} <FontAwesomeIcon icon={faCoins} />
//               </div>
//             )}
//             {phim.episodes === 1 ? (
//               <div className="movie-views"><div className="movie-category">Full</div></div>
//             ) : null}
//           </div>
          
//           <Card.Img variant="top" src={`${process.env.REACT_APP_UPLOAD_URL}/${phim.image || 'temp.jpg'}`} alt={movie.movieName} className="movie-image" />

//           <Card.Body>
//             <Card.Title className="movie-name">{phim.name}</Card.Title>
//           </Card.Body>
//         </Link>
//       </Card>

//       <Modal show={showPopup} onHide={handleClosePopup} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Yêu cầu mua phim</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           Bộ phim này có giá {phim.price}. Bạn cần mua phim để có thể xem.
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClosePopup}>
//             Đóng
//           </Button>
//           <Button variant="primary" onClick={() => { /* logic mua phim */ }}>
//             Mua phim
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default MovieCardSaved;


import React, { useState,useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
// import { faStar, faEye } from '@fortawesome/free-solid-svg-icons';
import './MovieCard.css';
import { getMovieDetail } from '../../Utils/api';
const MovieCardSaved = ({ movie }) => {
  const movieId = movie.movieId;
  const[phim, setPhim] = useState([{}]);
  useEffect(() => {
   
    const fetchMovieDetail = async () => {
      try {
          const movieDetail = await getMovieDetail(movieId);
          setPhim(movieDetail);
         
      } catch (error) {
        console.error('Error fetching movie detail');
      
      }
  };

    fetchMovieDetail();
}

, [movieId]);

  return (
    <div>
      <Card className="movie-card">
        <Link to={`/movie/${phim.movieId}`} className="movie-link">
          {/* <div className="movie-info">
            <div className="movie-rating">
              {phim.star}/5 <FontAwesomeIcon icon={faStar} />
            </div>
            
             */}
          <div className="movie-info">
            {phim.price === 0 ? (
              <div className="movie-rating">Free</div>
            ) : (
              <div className="movie-rating">
                {phim.price} <FontAwesomeIcon icon={faCoins} />
              </div>
            )}
            {phim.episodes === 1 ? (
              <div className="movie-views"><div className="movie-category">Full</div></div>
            ) : null}
          </div>
          
          <Card.Img variant="top" src={`${process.env.REACT_APP_UPLOAD_URL}/${phim.image || 'temp.jpg'}`} alt={movie.movieName} className="movie-image" />

          <Card.Body>
            <Card.Title className="movie-name">{phim.name}</Card.Title>
          </Card.Body>
        </Link>
      </Card>
    </div>
  );
};

export default MovieCardSaved;