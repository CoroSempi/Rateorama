const mongoose = require("mongoose");

const subSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  userRate: {
    type: Number,
    required: true,
  },
});
const RateBase = new mongoose.Schema({
  postID: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
  numberOfPeople: {
    type: Number,
    required: true,
  },
  ratings: [subSchema],
});
module.exports = mongoose.model("RateBase", RateBase);
