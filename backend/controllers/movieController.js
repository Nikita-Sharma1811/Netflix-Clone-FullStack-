const Movie = require("../models/Movie");

// Add Movie
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

// Get All Movies
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

// Get Movie By ID
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

// Like Movie
const likeMovie = async (req, res) => {

    try {

        const movie = await Movie.findById(req.params.id);

        console.log(movie);

        if (!movie) {
            return res.status(404).json({
                message: "Movie not found"
            });
        }

        movie.likes += 1;

        await movie.save();

        res.json(movie);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message
        });

    }

};

// Add Review
// Add Review
const addReview = async (req, res) => {
    try {
        console.log("Movie ID:", req.params.id);
        console.log("Body:", req.body);

        const movie = await Movie.findById(req.params.id);

        if (!movie) {
            return res.status(404).json({
                message: "Movie not found",
            });
        }

        movie.reviews.push({
            user: req.body.user,
            comment: req.body.comment,
            stars: req.body.stars,
        });

        await movie.save();

        res.json(movie);

    } catch (error) {
        console.error("Add Review Error:", error);

        res.status(500).json({
            message: error.message,
        });
    }
};
// Delete Movie
const deleteMovie = async (req, res) => {

    try {

        await Movie.findByIdAndDelete(req.params.id);

        res.json({
            message: "Movie Deleted Successfully",
        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};
const addToWatchlist = async (req, res) => {

    try {

        const { userId } = req.body;

        const movie = await Movie.findById(req.params.id);

        if (!movie) {
            return res.status(404).json({
                message: "Movie Not Found"
            });
        }

        if (movie.watchlistedBy.includes(userId)) {
            return res.status(400).json({
                message: "Already in Watchlist"
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
const removeFromWatchlist = async (req,res)=>{

    try{

        const {userId,movieId}=req.params;

        console.log("User:", userId);
        console.log("Movie:", movieId);


        const movie = await Movie.findById(movieId);


        if(!movie){
            return res.status(404).json({
                message:"Movie not found"
            });
        }


        movie.watchlistedBy = movie.watchlistedBy.filter(
            id => id.toString() !== userId
        );


        await movie.save();


        res.json({
            message:"Removed from watchlist"
        });


    }
    catch(error){

        console.log("REMOVE ERROR:", error);

        res.status(500).json({
            message:error.message
        });

    }

};
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