import { useEffect, useState } from "react";
import API from "../api/axios";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import MovieCard from "../components/MovieCard";
import Footer from "../components/Footer";


function Home() {

    const [movies, setMovies] = useState([]);


    useEffect(() => {

        fetchMovies();

    }, []);



    const fetchMovies = async () => {

        try {

            const response = await API.get("/movies");

            setMovies(response.data);

        } catch (error) {

            console.log(error);

        }

    };



    // Category filter
    const getCategoryMovies = (category) => {

        return movies.filter(movie =>
            movie.category?.toLowerCase().includes(category)
        );

    };



    // Trending
    const trendingMovies = movies.filter(movie =>
        movie.isTrending
    );



    // Top Rated
    const topRatedMovies = [...movies].sort(
        (a, b) => b.rating - a.rating
    );



    const categories = [

        {
            title: "🔥 Trending Now",
            movies: trendingMovies
        },


        {
            title: "🎬 Popular on Netflix",
            movies: movies
        },


        {
            title: "🇺🇸 Hollywood Movies",
            movies: getCategoryMovies("hollywood")
        },


        {
            title: "🇮🇳 Bollywood Movies",
            movies: getCategoryMovies("bollywood")
        },


        {
            title: "💥 Action Movies",
            movies: getCategoryMovies("action")
        },


        {
            title: "😂 Comedy Movies",
            movies: getCategoryMovies("comedy")
        },


        {
            title: "💕 Romance Movies",
            movies: getCategoryMovies("romance")
        },


        {
            title: "👻 Horror Movies",
            movies: getCategoryMovies("horror")
        },


        {
            title: "🚀 Sci-Fi Movies",
            movies: getCategoryMovies("sci")
        },


        {
            title: "🎭 Drama Movies",
            movies: getCategoryMovies("drama")
        },


        {
            title: "🔪 Thriller Movies",
            movies: getCategoryMovies("thriller")
        },


        {
            title: "⭐ Top Rated Movies",
            movies: topRatedMovies
        }

    ];



    return (

        <>


            <Navbar />


            <Hero />



            <div className="home">


                {
                    categories.map((category, index) => (


                        category.movies.length > 0 && (


                            <section key={index}>


                                <h2>
                                    {category.title}
                                </h2>



                                <div className="movie-row">


                                    {
                                        category.movies.map(movie => (


                                            <MovieCard

                                                key={movie._id}

                                                movie={movie}

                                            />


                                        ))
                                    }


                                </div>



                            </section>


                        )


                    ))
                }



            </div>



            <Footer />


        </>

    );

}


export default Home;