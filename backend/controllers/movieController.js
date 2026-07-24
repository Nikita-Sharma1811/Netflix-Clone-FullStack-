const Movie = require("../models/Movie");

// ======================
// Add Movie
// ======================

const addMovie = async (req, res) => {

    try {

        const movie = await Movie.create(req.body);

        res.status(201).json(movie);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};

// ======================
// Get All Movies
// ======================

const getMovies = async (req, res) => {

    try {

        const movies = await Movie.find();

        res.json(movies);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};

// ======================
// Get Single Movie
// ======================

const getMovie = async (req, res) => {

    try {

        const movie = await Movie.findById(req.params.id);

        if (!movie) {

            return res.status(404).json({
                message: "Movie Not Found",
            });

        }

        res.json(movie);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};

// ======================
// Get Watchlist
// ======================

const getWatchlist = async (req, res) => {

    try {

        const movies = await Movie.find({

            watchlistedBy: req.params.userId

        });

        res.json(movies);

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// ======================
// Like Movie
// ======================

const likeMovie = async (req, res) => {

    try {

        const movie = await Movie.findById(req.params.id);

        if (!movie) {

            return res.status(404).json({

                message: "Movie not found"

            });

        }

        movie.likes += 1;

        await movie.save();

        res.json(movie);

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// ======================
// Add Review
// ======================

const addReview = async (req, res) => {

    try {

        const movie = await Movie.findById(req.params.id);

        if (!movie) {

            return res.status(404).json({

                message: "Movie not found"

            });

        }

        movie.reviews.push({

            user: req.body.user,

            comment: req.body.comment,

            stars: Number(req.body.stars)

        });

        // Calculate Average Rating

        const totalStars = movie.reviews.reduce(

            (sum, review) => sum + Number(review.stars),

            0

        );

        movie.rating = (

            totalStars /

            movie.reviews.length

        ).toFixed(1);

        await movie.save();

        res.json(movie);

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};
// ======================
// Delete Movie
// ======================

const deleteMovie = async (req, res) => {

    try {

        await Movie.findByIdAndDelete(req.params.id);

        res.json({
            message: "Movie Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// ======================
// Add To Watchlist
// ======================

const addToWatchlist = async (req, res) => {

    try {

        const { userId } = req.body;

        const movie = await Movie.findById(req.params.id);

        if (!movie) {

            return res.status(404).json({
                message: "Movie Not Found"
            });

        }

        const alreadyAdded = movie.watchlistedBy.some(

            (id) => id.toString() === userId

        );

        if (alreadyAdded) {

            return res.status(400).json({
                message: "Movie already in Watchlist"
            });

        }

        movie.watchlistedBy.push(userId);

        await movie.save();

        res.json({
            message: "Movie Added To Watchlist",
            movie
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// ======================
// Remove From Watchlist
// ======================

const removeFromWatchlist = async (req, res) => {

    try {

        const { userId, movieId } = req.params;

        const movie = await Movie.findById(movieId);

        if (!movie) {

            return res.status(404).json({
                message: "Movie Not Found"
            });

        }

        movie.watchlistedBy = movie.watchlistedBy.filter(

            (id) => id.toString() !== userId

        );

        await movie.save();

        res.json({
            message: "Removed From Watchlist",
            movie
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// ======================
// Export Controllers
// ======================

module.exports = {

    addMovie,

    getMovies,

    getMovie,

    likeMovie,

    addReview,

    deleteMovie,

    addToWatchlist,

    getWatchlist,

    removeFromWatchlist

};