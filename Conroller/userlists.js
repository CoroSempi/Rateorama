const express = require("express");
const mongoose = require("mongoose");

// Rateorama Schemes(models)
const UserLists = require("../Models/UsersLists");
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
  next();
};

// Apply middleware to the whole route
router.use(setHeadersMiddleware);

router.post("/favorites", async (req, res) => {
  try {
    const username = req.body.username;
    const data = {
      category: req.body.category,
      contentID: new mongoose.Types.ObjectId(req.body.contentID),
    };

    const userLists = await UserLists.findOne({ userName: username });
    if (userLists) {
      const Exists = userLists.watchLater.some(
        (content) =>
          content.category === data.category &&
          content.contentID.equals(data.contentID)
      );
      if (Exists) {
        res.status(400).send("Movie already exists in the watch later list.");
        return;
      }
      if (
        data.category === "series" ||
        data.category === "movies" ||
        data.category === "tvshows"
      ) {
        userLists.favorites.push(data);
        const updatedUserLists = await userLists.save();
        if (updatedUserLists) {
          res.status(200).json(updatedUserLists);
          return;
        }
      } else {
        res.status(404).send("category not found for the provided data");
      }
    } else {
      res
        .status(404)
        .send(
          "UserLists not found for the provided username or category is wrong"
        );
      return;
    }
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
      res.status.json(favs);
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

router.post("/watchLater", async (req, res) => {
  try {
    const username = req.body.username;
    const data = {
      category: req.body.category,
      contentID: new mongoose.Types.ObjectId(req.body.contentID),
    };

    const userLists = await UserLists.findOne({ userName: username });
    if (userLists) {
      const Exists = userLists.watchLater.some(
        (content) =>
          content.category === data.category &&
          content.contentID.equals(data.contentID)
      );
      if (Exists) {
        res.status(400).send("Movie already exists in the watch later list.");
        return;
      }
      if (
        data.category === "series" ||
        data.category === "movies" ||
        data.category === "tvshows"
      ) {
        userLists.watchLater.push(data);
        const updatedUserLists = await userLists.save();
        if (updatedUserLists) {
          res.status(200).json(updatedUserLists);
          return;
        }
      } else {
        res.status(404).send("category not found for the provided data");
      }
    } else {
      res.status(404).send("UserLists not found for the provided username ");
      return;
    }
  } catch (error) {
    res.status(400).send("Sorry, there was an error: " + error.message);
    console.log("ERROR: " + error.message);
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
