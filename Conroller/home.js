const express = require("express");
const mongoose = require("mongoose");

// Rateorama Schemes(models)
const Movies = require("../Models/Movies");
const Series = require("../Models/Series");
const TVshows = require("../Models/TVshows");

// Create a Router
const router = express.Router();

// Middleware for parsing JSON
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
// Middleware to set headers
const setHeadersMiddleware = (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  next();
};
// Apply middleware to the whole route
router.use(setHeadersMiddleware);

// topRated route--------------------------------------------
router.get("/topRated", async (req, res) => {
  try {
    const pipeline = [
      {
        $unionWith: {
          coll: "tvshows",
        },
      },
      {
        $unionWith: {
          coll: "series",
        },
      },
      {
        $unionWith: {
          coll: "movies",
        },
      },
      {
        $sort: { Rate: -1 },
      },
      {
        $limit: 5,
      },
    ];
    const result = await TVshows.aggregate(pipeline);
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).send("Sorry there is an ERROR!" + error.message);
    console.log("ERROR !:" + error.message);
  }
});

// theLatest route--------------------------------------------
router.get("/theLatest", async (req, res) => {
  try {
    const pipeline = [
      {
        $unionWith: {
          coll: "movies",
        },
      },
      {
        $unionWith: {
          coll: "tvshows",
        },
      },
      {
        $unionWith: {
          coll: "series",
        },
      },
      {
        $sort: { RelaseDate: -1 },
      },
      {
        $limit: 5,
      },
    ];

    const result = await TVshows.aggregate(pipeline);
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).send("Sorry there is an ERROR!" + error.message);
    console.log("ERROR !:" + error.message);
  }
});

// movieSlider route--------------------------------------------
router.get("/movieSlider", async (req, res) => {
  try {
    const result = await Movies.find().sort({ Rate: -1 }).limit(20);
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).send("Sorry there is an ERROR!" + error.message);
    console.log("ERROR !:" + error.message);
  }
});

// seriesSlider route--------------------------------------------
router.get("/seriesSlider", async (req, res) => {
  try {
    const result = await Series.find().sort({ Rate: -1 }).limit(20);
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).send("Sorry there is an ERROR!" + error.message);
    console.log("ERROR !:" + error.message);
  }
});

// tvshowsSlider route--------------------------------------------
router.get("/tvshowsSlider", async (req, res) => {
  try {
    const result = await TVshows.find().sort({ Rate: -1 }).limit(20);
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).send("Sorry there is an ERROR!" + error.message);
    console.log("ERROR !:" + error.message);
  }
});
// search route ---------------------------------------------------
router.get("/search", async (req, res) => {
  try {
    const keyword = req.query.keyword;

    const tvShows = await TVshows.find({
      name: { $regex: keyword, $options: "i" },
    });
    const series = await Series.find({
      name: { $regex: keyword, $options: "i" },
    });
    const movies = await Movies.find({
      name: { $regex: keyword, $options: "i" },
    });

    // Combine the results
    const searchResults = tvShows.concat(movies, series);

    res.status(200).json(searchResults);
  } catch (error) {
    console.error("Error searching:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
