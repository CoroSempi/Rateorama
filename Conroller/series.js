const express = require("express");

// Rateorama Schemes(models)
const Series = require("../Models/Series");
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

//seriesMain--------------------------------------
router.get("/", async (req, res) => {
  try {
    const rankingBy = req.query.rankingBy;
    if (
      rankingBy === "Rate" ||
      rankingBy === "RelaseDate" ||
      rankingBy === "ratingsNumber"
    ) {
      const sortField = {};
      sortField[rankingBy] = -1;
      console.log(sortField);
      const result = await Series.find().sort(sortField).limit(50);
      res.status(200).json(result);
      return;
    } else {
      res.status(200).json("please enter right field name");
    }
  } catch (error) {
    res.status(400).send("Sorry there is an ERROR!:" + error.message);
  }
});

//topRated--------------------------------------
router.get("/topRated", async (req, res) => {
  try {
    const result = await Series.find().sort({ Rate: -1 }).limit(5);
    res.status(200).json(result);
    return;
  } catch (error) {
    res.status(400).send("Sorry there is an ERROR!:" + error.message);
  }
});

//theLatest--------------------------------------
router.get("/theLatest", async (req, res) => {
  try {
    const result = await Series.find().sort({ RelaseDate: -1 }).limit(5);
    res.status(200).json(result);
    return;
  } catch (error) {
    res.status(400).send("Sorry there is an ERROR!:" + error.message);
  }
});
module.exports = router;
