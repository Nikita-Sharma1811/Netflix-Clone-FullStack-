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

    return (

        <>

            <Navbar />

            <Hero movie={movies[0]} />

            <div className="home">

                <h2>Trending Now</h2>

                <div className="movie-grid">

                    {movies.map((movie) => (

                        <MovieCard
                            key={movie._id}
                            movie={movie}
                        />

                    ))}

                </div>

            </div>

            <Footer />

        </>

    );

}

export default Home;