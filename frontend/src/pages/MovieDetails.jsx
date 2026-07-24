import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import MovieCard from "../components/MovieCard";

function MovieDetails() {
    const { id } = useParams();

    const [movie, setMovie] = useState(null);
    const [comment, setComment] = useState("");
    const [stars, setStars] = useState(0);
    const [similarMovies, setSimilarMovies] = useState([]);
    const [isWatchlisted, setIsWatchlisted] = useState(false);

    useEffect(() => {
        fetchMovie();
    }, [id]);

    const fetchMovie = async () => {
        try {
            const response = await API.get(`/movies/${id}`);
            setMovie(response.data);

            const user = JSON.parse(localStorage.getItem("user"));

            if (
                user &&
                response.data.watchlistedBy &&
                response.data.watchlistedBy.includes(user._id)
            ) {
                setIsWatchlisted(true);
            } else {
                setIsWatchlisted(false);
            }

            const allMovies = await API.get("/movies");

            const filtered = allMovies.data.filter(
                (m) =>
                    m._id !== response.data._id &&
                    m.category === response.data.category
            );

            setSimilarMovies(filtered);

        } catch (error) {
            console.log(error);
        }
    };

    const handleLike = async () => {
        try {
            const response = await API.put(`/movies/like/${id}`);
            setMovie(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleWatchlist = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));

            if (!user) {
                alert("Please login first");
                return;
            }

            if (isWatchlisted) {

                await API.delete(
                    `/movies/watchlist/${user._id}/${movie._id}`
                );

                setIsWatchlisted(false);
                alert("Removed from Watchlist");

            } else {

                await API.post(
                    `/movies/watchlist/${movie._id}`,
                    {
                        userId: user._id
                    }
                );

                setIsWatchlisted(true);
                alert("Added to Watchlist");
            }

        } catch (error) {
            console.log(error);
        }
    };

    const getEmbedUrl = (url) => {
        if (!url) return "";

        if (url.includes("youtube.com/watch?v=")) {
            return url.replace("watch?v=", "embed/");
        }

        if (url.includes("youtu.be/")) {
            const videoId = url.split("youtu.be/")[1]?.split("?")[0];
            return `https://www.youtube.com/embed/${videoId}`;
        }

        return url;
    };

    const handleReview = async () => {

        if (stars === 0) {
            alert("Please select a rating");
            return;
        }

        if (!comment.trim()) {
            alert("Please write a review");
            return;
        }

        try {

            const user = JSON.parse(localStorage.getItem("user") || "null");

            const response = await API.post(
                `/movies/review/${id}`,
                {
                    user: user?.name || "User",
                    comment,
                    stars
                }
            );

            setMovie(response.data);
            setComment("");
            setStars(0);

        } catch (error) {
            console.log(error);
        }
    };

    if (!movie) return <h2>Loading...</h2>;
        if (!movie) return <h2>Loading...</h2>;

    return (

        <div className="details">

            <img
                className="banner"
                src={movie.banner || movie.poster}
                alt={movie.title}
            />

            <div className="details-content">

                <h1>{movie.title}</h1>

                <p>{movie.description}</p>

                <div className="movie-meta">

                    <span>⭐ {movie.rating}</span>
                    <span>📅 {movie.year}</span>
                    <span>🎭 {movie.category}</span>
                    <span>⏱️ {movie.duration}</span>

                </div>

                <div className="details-buttons">

    <button 
        className="netflix-btn like-btn"
        onClick={handleLike}
    >
        ❤️ Like ({movie.likes})
    </button>


    <button 
        className="netflix-btn watch-btn"
        onClick={handleWatchlist}
    >
        {isWatchlisted
            ? "✓ My List"
            : "+ My List"}
    </button>


                </div>

                <h2 style={{ marginTop: "35px" }}>
                    🎬 Trailer
                </h2>

                {movie.trailer && (

                    <iframe
                        width="100%"
                        height="450"
                        src={getEmbedUrl(movie.trailer)}
                        title={movie.title}
                        frameBorder="0"
                        allowFullScreen
                    ></iframe>

                )}

                <h2 style={{ marginTop: "40px" }}>
                    ⭐ Add Review
                </h2>

                <div className="rating-box">

                    {[1, 2, 3, 4, 5].map((star) => (

                        <span
                            key={star}
                            className={
                                star <= stars
                                    ? "selected-star"
                                    : "star"
                            }
                            onClick={() => setStars(star)}
                        >
                            ★
                        </span>

                    ))}

                </div>

                <input
                    type="text"
                    placeholder="Write your review..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />

                <button onClick={handleReview}>
                    Submit Review
                </button>

                <h2 style={{ marginTop: "40px" }}>
                    ⭐ Reviews
                </h2>

                {movie.reviews?.length > 0 ? (

                    movie.reviews.map((review, index) => (

                        <div
                            className="review-card"
                            key={index}
                        >

                            <h3>
                                {review.user || "User"}
                            </h3>

                            <p>
                                {"★".repeat(review.stars || 5)}
                            </p>

                            <p>
                                {review.comment}
                            </p>

                        </div>

                    ))

                ) : (

                    <p>No Reviews Yet</p>

                )}

                <h2 style={{ marginTop: "45px" }}>
                    🎞 Similar Movies
                </h2>

                <div className="movie-row">

                    {similarMovies.length > 0 ? (

                        similarMovies.map((movie) => (

                            <MovieCard
                                key={movie._id}
                                movie={movie}
                            />

                        ))

                    ) : (

                        <p>No Similar Movies Found</p>

                    )}

                </div>

            </div>

        </div>

    );

}

export default MovieDetails;