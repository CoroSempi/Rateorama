const express = require("express");
const mongoose = require("mongoose");

// Rateorama Schemes(models)
const Users = require("../Models/Users");
const Movies = require("../Models/Movies");
const Series = require("../Models/Series");
const TVshows = require("../Models/TVshows");
const Ratebase = require("../Models/RateBase");
// Create a Router
const router = express.Router();
// Middleware for parsing JSON
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Middleware to set headers
const setHeadersMiddleware = (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
};

// Apply middleware to the whole route
router.use(setHeadersMiddleware);

router.post("/add", async (req, res) => {
  try {
    const postId = new mongoose.Types.ObjectId(req.body.postid);
    const username = req.body.username;
    const userRate = req.body.rate;

    const rateBase = await Ratebase.findOne({ postID: postId });
    if (!rateBase) {
      res.status(404).json({
        message:
          "The movie you're trying to rate does not exist in the database.",
      });
      return;
    }

    const existingRating = rateBase.ratings.find(
      (rating) => rating.username === username
    );

    if (existingRating) {
      if (existingRating.userRate !== +userRate) {
        const oldRate = existingRating.userRate;
        existingRating.userRate = userRate;
        rateBase.rate =
          (rateBase.rate * rateBase.numberOfPeople - oldRate + userRate) /
          rateBase.numberOfPeople;
      }
    } else {
      rateBase.ratings.push({ username, userRate });
      rateBase.rate =
        (rateBase.rate * rateBase.numberOfPeople + userRate / 5) /
        (rateBase.numberOfPeople + 1);
      rateBase.numberOfPeople += 1;
    }
    await rateBase.save();
    const post =
      (await Movies.findOne({ _id: postId })) ||
      (await Series.findOne({ _id: postId })) ||
      (await TVshows.findOne({ _id: postId }));
    console.log(post);
    post.Rate = rateBase.rate;
    post.ratingsNumber = rateBase.numberOfPeople;
    post.save();
    console.log(post);
    res.status(200).json(rateBase);
  } catch (error) {
    res.status(400).send("Sorry there is an ERROR!" + error.message);
    console.log("ERROR !:" + error.message);
  }
});

router.delete("/delete", async (req, res) => {
  try {
    const postId = new mongoose.Types.ObjectId(req.body.postid);
    const username = req.body.username;

    const rateBase = await Ratebase.findOne({ postID: postId });
    if (!rateBase) {
      res.status(404).json({
        message:
          "The movie you're trying to delete a rating for does not exist in the database.",
      });
      return;
    }

    const existingRatingIndex = rateBase.ratings.findIndex(
      (rating) => rating.username === username
    );

    if (existingRatingIndex === -1) {
      res.status(404).json({
        message:
          "The user you're trying to delete a rating for does not have a rating for this movie.",
      });
      return;
    }

    const existingRating = rateBase.ratings[existingRatingIndex];
    const oldRate = existingRating.userRate;
    rateBase.ratings.splice(existingRatingIndex, 1);
    rateBase.rate =
      (rateBase.rate * rateBase.numberOfPeople - oldRate) /
      (rateBase.numberOfPeople - 1);
    rateBase.numberOfPeople -= 1;

    await rateBase.save();

    const post =
      (await Movies.findOne({ _id: postId })) ||
      (await Series.findOne({ _id: postId })) ||
      (await TVshows.findOne({ _id: postId }));

    post.Rate = rateBase.rate;
    post.ratingsNumber = rateBase.numberOfPeople;
    await post.save();

    res.status(200).json(rateBase);
  } catch (error) {
    res.status(400).send("Sorry there is an ERROR!" + error.message);
    console.log("ERROR !:" + error.message);
  }
});
module.exports = router;
