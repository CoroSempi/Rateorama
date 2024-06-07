const express = require("express");

// Rateorama Schemes(models)
const UserLists = require("../Models/UsersLists");
const Movies = require("../Models/Movies");
const Series = require("../Models/Series");
const TVshows = require("../Models/TVshows");
const Users = require("../Models/Users");
const Mails = require("../Models/Mails");
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

router.get("/mails", async (req, res) => {
  try {
    const username = req.query.username;
    const checking = await Users.findOne({ userName: username });
    const mails = await Mails.find({ userName: username });
    if (!username || !checking) {
      res.status(200).json("fill username field correctly !");
      return;
    }
    res.status(200).json(mails[0].usermails);
  } catch (error) {
    res.status(400).send("Sorry there is an ERROR!" + error.message);
    console.log("ERROR !:" + error.message);
  }
});

router.get("/favorites", async (req, res) => {
  try {
    const userName = req.query.username;
    const userLists = await UserLists.findOne({ userName });
    if (userLists) {
      const { favorites, watchLater } = userLists;
      console.log("Favorites:", favorites);
      const favs = [];

      for (const item of favorites) {
        const { category, contentID } = item;
        const content =
          (await Movies.findOne({ category, _id: contentID })) ||
          (await Series.findOne({ category, _id: contentID })) ||
          (await TVshows.findOne({ category, _id: contentID }));
        if (content) {
          favs.push(content);
          console.log("Movie found:", favs);
        }
      }
      res.status(200).json(favs);
      return;
    } else {
      res.status(404).send("UserLists not found for the provided username");
      return;
    }
  } catch (error) {
    res.status(400).send("Sorry there is an ERROR!" + error.message);
    console.log("ERROR !:" + error.message);
  }
});

router.get("/watchLater", async (req, res) => {
  try {
    const userName = req.query.username;
    const userLists = await UserLists.findOne({ userName });
    if (userLists) {
      const { favorites, watchLater } = userLists;
      console.log("Favorites:", watchLater);
      const later = [];

      for (const item of watchLater) {
        const { category, contentID } = item;
        const content =
          (await Movies.findOne({ category, _id: contentID })) ||
          (await Series.findOne({ category, _id: contentID })) ||
          (await TVshows.findOne({ category, _id: contentID }));
        if (content) {
          later.push(content);
          console.log("Movie found:", later);
        }
      }
      res.status(200).json(later);
      return;
    } else {
      res.status(404).send("UserLists not found for the provided username");
      return;
    }
  } catch (error) {
    res.status(400).send("Sorry there is an ERROR!" + error.message);
    console.log("ERROR !:" + error.message);
  }
});

module.exports = router;
