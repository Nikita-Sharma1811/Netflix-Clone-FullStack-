const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({

    user: {

        type: String,

        default: "User"

    },

    comment: {

        type: String,

        required: true

    },

    stars: {

        type: Number,

        required: true,

        min: 1,

        max: 5

    }

});

const movieSchema = new mongoose.Schema(

    {

        title: {

            type: String,

            required: true

        },

        description: {

            type: String,

            required: true

        },

        poster: {

            type: String,

            required: true

        },

        banner: {

            type: String,

            default: ""

        },

        trailer: {

            type: String,

            default: ""

        },

        category: {

            type: String,

            required: true

        },

        genre: {

            type: [String],

            default: []

        },

        year: {

            type: Number,

            required: true

        },

        duration: {

            type: String,

            default: ""

        },

        rating: {

            type: Number,

            default: 0

        },

        reviews: [

            reviewSchema

        ],

        likes: {

            type: Number,

            default: 0

        },

        isTrending: {

            type: Boolean,

            default: false

        },

        watchlistedBy: [

            {

                type: mongoose.Schema.Types.ObjectId,

                ref: "User"

            }

        ]

    },

    {

        timestamps: true

    }

);

module.exports = mongoose.model(
    "Movie",
    movieSchema
);