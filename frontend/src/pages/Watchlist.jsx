import { useEffect, useState } from "react";
import API from "../api/axios";

function Watchlist() {

    const [movies, setMovies] = useState([]);

    const user = JSON.parse(localStorage.getItem("user") || "null");

    useEffect(() => {
        if (user && user._id) {
            fetchWatchlist();
        }
    }, []);

    const fetchWatchlist = async () => {
        if (!user || !user._id) return;
        try {
            const response = await API.get(
                `/movies/watchlist/${user._id}`
            );
            setMovies(response.data);
        } catch (error) {
            console.log(error);
        }
    };


    // REMOVE MOVIE FUNCTION
    const removeMovie = async (movieId) => {

        try {

            await API.delete(
                `/movies/watchlist/${user._id}/${movieId}`
            );


            setMovies(
                movies.filter(
                    movie => movie._id !== movieId
                )
            );


        } catch(error){

            console.log(error);

        }

    };


    return (

        <div className="home">

            <h1>My Watchlist</h1>


            <div className="movie-grid">

                {movies.map((movie) => (

                    <div className="movie-card" key={movie._id}>


                        <img
                            src={movie.poster}
                            alt={movie.title}
                        />


                        <h2>{movie.title}</h2>


                        <p>{movie.category}</p>


                        <p>⭐ {movie.rating}</p>


                        <button
                            onClick={() => removeMovie(movie._id)}
                        >
                            Remove from Watchlist
                        </button>


                    </div>

                ))}


            </div>

        </div>

    );

}


export default Watchlist;