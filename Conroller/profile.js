const express = require("express");

// Rateorama Schemes(models)
const UserLists = require("../Models/UsersLists");
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

module.exports = router;
