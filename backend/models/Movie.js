const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    poster: {
      type: String,
      required: true,
    },

    banner: {
      type: String,
      default: "",
    },

    trailer: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      required: true,
    },

    genre: {
      type: [String],
      default: [],
    },

    year: {
      type: Number,
      required: true,
    },

    duration: {
      type: String,
      default: "",
    },

    rating: {
      type: Number,
      default: 0,
    },

    // ✅ Updated Reviews Schema
    reviews: [
      {
        user: {
          type: String,
          default: "User",
        },
        comment: {
          type: String,
          required: true,
        },
        stars: {
          type: Number,
          default: 5,
        },
      },
    ],

    likes: {
      type: Number,
      default: 0,
    },

    isTrending: {
      type: Boolean,
      default: false,
    },

    watchlistedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Movie", movieSchema);