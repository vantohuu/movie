import React, { useEffect, useState } from 'react';
import { getAllMoviesBoughtByUser, deleteMovieBuy } from  '../../../Utils/api'; 
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import MovieCardBought from '../../../components/Movie/MovieCardBought';

const BoughtMoviesPage = () => {
    const [boughtMovies, setBoughtMovies] = useState([]);
    const [error, setError] = useState('');
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const username = userInfo.username;
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        const fetchBoughtMovies = async () => {
            try {
                // const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                if (userInfo && userInfo.username) {
                    // const usernam = userInfo.username;
                    const response = await getAllMoviesBoughtByUser(username);
                    setBoughtMovies(response);
                } else {
                    setError('No user information found');
                    console.log(error)
                }
                
            } catch (error) {
                console.error('Error fetching bought movies:', error);
            }
        };

        fetchBoughtMovies();
    }, []);

    const handleDelete = async (movieId) => {
        try {
           
            if (userInfo && userInfo.username) {
                const username = userInfo.username;
                const response = await deleteMovieBuy(movieId, username);
                setBoughtMovies(response);
            } else {
                setError('No user information found');
            }
            
            setBoughtMovies(prevMovies => prevMovies.filter(movie => movie.id !== movieId));
        } catch (error) {
            console.error('Error deleting movie buy:', error);
        }
    };

    return (
        // <div>
        //     <h1>Bought Movies</h1>
        //     <ul>
        //         {boughtMovies.map(movie => (
        //             <li key={movie.id}>
        //                 <div>{movie.title}</div>
        //                 <button onClick={() => handleDelete(movie.id)}>Delete</button>
        //             </li>
        //         ))}
        //     </ul>
        // </div>
        <div className='mainBody'>
        <Header />
        <div className="saved-movies-page">
            <h1>Phim đã mua</h1>
            {loading ? (
                <p>Loading...</p>
            ):(boughtMovies.length === 0 ? (
                <p>Bạn chưa mua phim nào.</p>
            ) : (
                <ul className="movie-list">
                    {boughtMovies.map(movie => (
                        <li key={movie.id}>
                            <MovieCardBought key={movie.id} movie={movie} />
                            <div>{movie.name}</div>
                            {/* <button onClick={() => handleDelete(movie.id)}>Delete</button> */}
                        </li>
                    ))}
                </ul>
            ))}
            
        </div>
        <Footer />
    </div>
    );
};

export default BoughtMoviesPage;