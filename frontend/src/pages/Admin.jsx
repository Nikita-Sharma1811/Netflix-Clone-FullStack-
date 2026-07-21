import { useState } from "react";
import API from "../api/axios";

function Admin() {

    const [movie, setMovie] = useState({

        title: "",
        description: "",
        poster: "",
        banner: "",
        trailer: "",
        category: "",
        year: "",
        duration: "",
        rating: "",
        isTrending: false

    });

    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        setMovie({
            ...movie,
            [name]: type === "checkbox" ? checked : value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await API.post("/movies", movie);

            alert("Movie Added Successfully");

            setMovie({
                title: "",
                description: "",
                poster: "",
                banner: "",
                trailer: "",
                category: "",
                year: "",
                duration: "",
                rating: "",
                isTrending: false
            });

        }

        catch (error) {

            alert("Error Adding Movie");

            console.log(error);

        }

    };

    return (

        <div className="admin">

            <h1>Add New Movie</h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="title"
                    placeholder="Movie Title"
                    value={movie.title}
                    onChange={handleChange}
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    value={movie.description}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="poster"
                    placeholder="Poster URL"
                    value={movie.poster}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="banner"
                    placeholder="Banner URL"
                    value={movie.banner}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="trailer"
                    placeholder="Trailer URL"
                    value={movie.trailer}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={movie.category}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="year"
                    placeholder="Year"
                    value={movie.year}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="duration"
                    placeholder="Duration"
                    value={movie.duration}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    step="0.1"
                    name="rating"
                    placeholder="IMDb Rating"
                    value={movie.rating}
                    onChange={handleChange}
                />

                <label>

                    Trending

                    <input
                        type="checkbox"
                        name="isTrending"
                        checked={movie.isTrending}
                        onChange={handleChange}
                    />

                </label>

                <button>

                    Add Movie

                </button>

            </form>

        </div>

    );

}

export default Admin;