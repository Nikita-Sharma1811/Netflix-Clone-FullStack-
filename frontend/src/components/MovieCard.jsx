import { Link } from "react-router-dom";
import { useState } from "react";
import API from "../api/axios";

function MovieCard({ movie }) {

    const [likes, setLikes] = useState(movie.likes || 0);


    const handleLike = async (e) => {

        e.preventDefault(); // details page open hone se rokega
        e.stopPropagation();

        try {

            const response = await API.put(
                `/movies/like/${movie._id}`
            );

            setLikes(response.data.likes);

        } catch (error) {

            console.log(error);

        }

    };


    return (

        <Link
            to={`/movie/${movie._id}`}
            style={{ textDecoration: "none", color: "inherit" }}
        >

            <div className="movie-card">

                <img
                    src={movie.poster}
                    alt={movie.title}
                />


                <h3>
                    {movie.title}
                </h3>


                <p>
                    ⭐ {movie.rating}
                </p>


                <button
                    onClick={handleLike}
                >
                    ❤️ Like {likes}
                </button>


            </div>

        </Link>

    );

}

export default MovieCard;