import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import API from "../api/axios";
import MovieCard from "../components/MovieCard";


function Search() {
    const [searchParams] = useSearchParams();

const search = searchParams.get("query") || "";

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

    const filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(search.toLowerCase())
    );

    return (

        <div className="home">

            <h1>Search Movies</h1>

            <div className="movie-grid">

                {filteredMovies.length > 0 ? (

                    filteredMovies.map((movie) => (

                        <MovieCard
                            key={movie._id}
                            movie={movie}
                        />

                    ))

                ) : (

                    <h2>No Movies Found</h2>

                )}

            </div>

        </div>

    );

}

export default Search;