const express = require("express");

const {
    addMovie,
    getMovies,
    getMovie,
    likeMovie,
    addReview,
    deleteMovie,
    addToWatchlist,
     getWatchlist,
     removeFromWatchlist

} = require("../controllers/movieController");

const router = express.Router();

// Add Movie
router.post("/", addMovie);


// Get All Movies
router.get("/", getMovies);
router.get("/watchlist/:userId", getWatchlist);

// Get Single Movie
router.get("/:id", getMovie);

// Like Movie
router.put("/like/:id", likeMovie);

// Add Review
router.post("/review/:id", addReview);

// Add to Watchlist
router.post("/watchlist/:id", addToWatchlist);

// Delete Movie
router.delete("/:id", deleteMovie);

router.delete(
"/watchlist/:userId/:movieId",
removeFromWatchlist
);

module.exports = router;