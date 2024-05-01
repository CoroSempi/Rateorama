const mongoose = require("mongoose");
const TVshows = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    default: "tvshows",
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  RelaseDate: {
    default: "Missingfield",
    type: String,
    required: true,
  },
  story: {
    type: String,
    required: true,
  },
  Rate: {
    type: Number,
    required: true,
  },
  ratingsNumber: {
    type: Number,
    required: true,
  },
  poster: {
    type: String,
    required: true,
  },
  bgPic: {
    type: String,
    required: true,
  },
  trailerLink: {
    type: String,
    required: true,
  },
  genres: {
    type: Array,
    required: true,
  },
  forAdults: {
    type: Boolean,
    required: true,
  },
});
module.exports = mongoose.model("TVshows", TVshows);
