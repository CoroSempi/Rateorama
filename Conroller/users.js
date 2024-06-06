const express = require("express");
const bcrypt = require("bcrypt");

// Rateorama Schemes(models)
const Users = require("../Models/Users");
const UserLists = require("../Models/UsersLists");
const Mails = require("../Models/Mails");
// Create a Router
const router = express.Router();
// Middleware for parsing JSON
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Middleware to set headers
const setHeadersMiddleware = (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  next();
};

// Apply middleware to the whole route
router.use(setHeadersMiddleware);

router.post("/signUp", async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const checking = await Users.findOne({ userName: username });
    if (!checking) {
      const done1 = await Users.create({
        userName: username,
        password: password,
        email: email,
      });
      const done2 = await UserLists.create({
        userName: username,
      });
      const done3 = await Mails.create({ userName: username });

      const mail = {
        content: `Hello ${username} !
         Welcome to Rateorama! We're more than happy to have you join our community, where your entertainment experience is our top priority.
         At Rateorama,we believe that entertainment should be both enjoyable and effortless, Our user-friendly interface and streamlined design will guide you seamlessly through our extensive collection, Whether you're seeking a gripping thriller, an uproarious comedy, or a captivating drama, you're just a click away from finding your next favorite watch`,
      };

      const doneMail = await Mails.findOneAndUpdate(
        { userName: username },
        { $push: { usermails: mail } },
        { new: true }
      );
      if (done1 && done2 && done3) {
        res.status(200).json("signedUp!");
        console.log(done1, done2, done3, doneMail);
        return;
      }
    } else if (checking) {
      res.status(200).json("userExisted");
      return;
    }
  } catch (error) {
    res.status(400).send("Sorry there is an ERROR!:" + error.message);
  }
});

router.post("/signIn", async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const checking = await Users.findOne({ userName: username });

    if (checking) {
      if (await bcrypt.compare(password, checking.password)) {
        res.status(200).json("signedIn!");
        return;
      }
    }

    res.status(200).json("Wrong Username or Password");
  } catch (error) {
    res.status(400).send("Sorry there is an ERROR!" + error.message);
    console.log("ERROR !:" + error.message);
  }
});

module.exports = router;
