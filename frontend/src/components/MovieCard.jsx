import { Link } from "react-router-dom";
import { useState } from "react";
import API from "../api/axios";

function MovieCard({ movie }) {

    const [likes, setLikes] = useState(movie.likes || 0);

    const handleLike = async (e) => {

        e.preventDefault();
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
            style={{
                textDecoration: "none",
                color: "inherit"
            }}
        >

            <div className="movie-card">

                <img
                    src={movie.poster}
                    alt={movie.title}
                />

                <div className="movie-info">

                    <h3>{movie.title}</h3>

                    <p>
                        ⭐ {movie.rating}
                    </p>

                    <p className="movie-category">
                        {movie.category}
                    </p>

                    <p className="movie-description">
                        {movie.description?.length > 80
                            ? movie.description.substring(0, 80) + "..."
                            : movie.description}
                    </p>

                    <div className="movie-buttons">

                        <button className="play-btn">
                            ▶ Play
                        </button>

                        <button
                            className="like-btn"
                            onClick={handleLike}
                        >
                            ❤️ {likes}
                        </button>

                    </div>

                </div>

            </div>

        </Link>

    );

}

export default MovieCard;