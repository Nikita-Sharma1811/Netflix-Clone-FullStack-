import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

function MovieDetails() {

    const { id } = useParams();

    const [movie, setMovie] = useState(null);
    const [comment, setComment] = useState("");


    useEffect(() => {

        fetchMovie();

    }, [id]);


    const fetchMovie = async () => {

        try {

            const response = await API.get(`/movies/${id}`);

            setMovie(response.data);

        } catch (error) {

            console.log(error);

        }

    };


    // Like Movie
    const handleLike = async () => {

        try {

            const response = await API.put(
                `/movies/like/${id}`
            );

            setMovie(response.data);

        } catch (error) {

            console.log(error);

        }

    };


    // Add Movie To Watchlist
    const handleWatchlist = async () => {

        try {

            const user = JSON.parse(
                localStorage.getItem("user")
            );


            if (!user) {

                alert("Please login first");
                return;

            }


            await API.post(
                `/movies/watchlist/${movie._id}`,
                {
                    userId: user._id
                }
            );


            alert("Added to Watchlist");


        } catch (error) {

            console.log(error);

        }

    };



    // Add Review
    const handleReview = async () => {


        if (!comment.trim()) {

            alert("Please write a review");

            return;

        }


        try {


            const response = await API.post(
                `/movies/review/${id}`,
                {
                    user: "User",
                    comment,
                    stars: 5
                }
            );


            setMovie(response.data);

            setComment("");


        } catch (error) {

            console.log(error);

        }

    };



    if (!movie) return <h2>Loading...</h2>;



    return (

        <div className="details">


            <img
                className="banner"
                src={movie.banner || movie.poster}
                alt={movie.title}
            />


            <div className="details-content">


                <h1>
                    {movie.title}
                </h1>


                <p>
                    {movie.description}
                </p>


                <p>
                    ⭐ {movie.rating}
                </p>


                <p>
                    📅 {movie.year}
                </p>


                <p>
                    🎭 {movie.category}
                </p>


                <p>
                    ⏱️ {movie.duration}
                </p>



                <button onClick={handleLike}>
                    ❤️ Like ({movie.likes})
                </button>


                <br /><br />


                <button onClick={handleWatchlist}>
                    ➕ My List
                </button>



                <br /><br />



                <h2>
                    🎬 Trailer
                </h2>


                {movie.trailer && (

                    <iframe
                        width="100%"
                        height="450"
                        src={movie.trailer}
                        title={movie.title}
                        frameBorder="0"
                        allowFullScreen
                    ></iframe>

                )}



                <br /><br />


                <h2>
                    Add Review
                </h2>


                <input
                    type="text"
                    placeholder="Write a review..."
                    value={comment}
                    onChange={(e)=>
                        setComment(e.target.value)
                    }
                />


                <button onClick={handleReview}>
                    Add Review
                </button>



                <h2>
                    ⭐ Reviews
                </h2>



                {
                    movie.reviews?.length > 0 ?

                    movie.reviews.map((review,index)=>(

                        <div 
                        className="review"
                        key={index}
                        >

                            <h4>
                                {review.user || "User"}
                            </h4>

                            <p>
                                {review.comment}
                            </p>

                            <p>
                                ⭐ {review.stars || 5}
                            </p>

                        </div>


                    ))

                    :

                    <p>
                        No reviews yet
                    </p>

                }


            </div>


        </div>

    );

}


export default MovieDetails;