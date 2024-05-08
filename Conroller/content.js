const express = require("express");
// Rateorama Schemes(models)
const Users = require("../Models/Users");
const Movies = require("../Models/Movies");
const Series = require("../Models/Series");
const TVshows = require("../Models/TVshows");
const RateBase = require("../Models/RateBase");
const Comments = require("../Models/Comments");
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

//Details route
router.get("/details", async (req, res) => {
  try {
    const id = req.query.id;
    const category = req.query.category;
    let response;
    if (id && category) {
      console.log(id, category);
      switch (category) {
        case "movies":
          response = await Movies.findById(id);
          break;
        case "series":
          response = await Series.findById(id);
          break;
        case "tvshows":
          response = await TVshows.findById(id);
          break;
        default:
          response = "no such a content with this id or category try again";
          break;
      }

      res.status(200).json(response);
      return;
    } else {
      res.status(400).send("Both id and category parameters are required.");
      return;
    }
  } catch (error) {
    res.status(400).send("Sorry there is an ERROR!");
    console.log("ERROR !:" + error.message);
    return;
  }
});

//Admin login
router.get("/comments", async (req, res) => {
  try {
    const id = req.query.id;
    let response;
    if (id) {
      response = await Comments.find({ postID: id });
      if (response) {
        res.status(200).json(response);
        return;
      } else {
        res.status(200).json("no such a content with this id");
        return;
      }
    } else {
      res.status(400).send("id is required.");
      return;
    }
  } catch (error) {
    res.status(400).send("Sorry there is an ERROR!");
    console.log("ERROR !:" + error.message);
  }
});

module.exports = router;
