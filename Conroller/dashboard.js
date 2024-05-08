const express = require("express");
const bcrypt = require("bcrypt");
const path = require("path");
const multer = require("multer");

// Rateorama Schemes(models)
const Admins = require("../Models/Admins");
const Users = require("../Models/Users");
const Mails = require("../Models/Mails");

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
router.use(express.static(path.join(__dirname, "..//views/dashboard/public")));

// Middleware to set headers
const setHeadersMiddleware = (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
};
// Apply middleware to the whole route
router.use(setHeadersMiddleware);

//Admin login
router.get("/Admins", (req, res) => {
  try {
    res.status(200).render("adminSignin.ejs");
    return;
  } catch (error) {
    res.status(400).send("Sorry there is an ERROR!");
    console.log("ERROR !:" + error.message);
  }
});

//Dashboard access
router.post("/panal", async (req, res) => {
  try {
    const username = req.body.user;
    const password = req.body.key;
    if (!username || !password) {
      res.status(200).render("adminSignin.ejs", { stat: "red" });
      return;
    }
    const admin = await Admins.findOne({ userName: username });
    if (!admin) {
      res.status(200).render("adminSignin.ejs", { stat2: "red2" });
      return;
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      res.status(200).render("adminSignin.ejs", { stat2: "red2" });
      return;
    }
    const users = await Users.countDocuments({});
    const movies = await Movies.countDocuments({});
    const series = await Series.countDocuments({});
    const tvShows = await TVshows.countDocuments({});
    const posts = movies + series + tvShows;

    res.status(200).render("index.ejs", {
      users: users,
      posts: posts,
      movies: movies,
      series: series,
      tvShows: tvShows,
      posts: posts,
    });
  } catch (error) {
    res.status(400).send("Sorry, there was an ERROR!:" + error.message);
    console.log("ERROR: " + error.message);
  }
});

// emails route
router.post("/mails", async (req, res) => {
  try {
    console.log("dsd");
    // Take data from admin's request
    const username = req.body.username;
    const email = req.body.email;
    const podcasting = req.body.oneuse;
    let usersList = [];

    // podcasting case
    if (podcasting) {
      if (!email) {
        res.status(200).json("fill");
        return;
      }
      await Users.find({}, { userName: 1, _id: 0 }).then((elements) => {
        const usernames = elements.map((element) => element.userName);
        usersList = usernames;
      });
      let done = null;
      for (const element of usersList) {
        done = await Mails.findOneAndUpdate(
          { userName: element },
          { $push: { usermails: { content: email } } },
          { new: true }
        );
      }
      if (done) {
        res.status(200).json("done");
        console.log(done);
        return;
      }
    }

    // sending email for specific user
    if (!podcasting) {
      if (!username || !email) {
        res.status(200).json("fill");
        return;
      }
      const checking = await Users.findOne({ userName: username });
      if (!checking) {
        res.status(200).json("No Such User");
        return;
      } else if (checking) {
        const done = await Mails.findOneAndUpdate(
          { userName: username },
          { $push: { usermails: { content: email } } },
          { new: true }
        );
        console.log(done);
        if (done) {
          res.status(200).json("done");
          return;
        }
      }
    }
  } catch (error) {
    res.status(400).json("Sorry, there was an ERROR!:" + error.message);
    console.log("ERROR: " + error.message);
  }
});

function formatName(inputName) {
  const words = inputName.split(" ");

  const formattedName = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");

  return formattedName;
}

function formatName1(inputName) {
  const words = inputName.split(" ");

  const formattedName = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return formattedName;
}

// Set up muulter middleware to store images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (req.body.Mname) {
      cb(null, "public/movies");
    } else if (req.body.Sname) {
      cb(null, "public/series");
    } else if (req.body.Tname) {
      cb(null, "public/tvshows");
    }
  },
  filename: function (req, file, cb) {
    let originalName = file.originalname;
    let ss = req.body.Mname || req.body.Sname || req.body.Tname;
    let formattedName = formatName(ss);
    let finalName;

    if (
      file.fieldname === "bg" ||
      file.fieldname === "Sbg" ||
      file.fieldname === "Tbg"
    ) {
      finalName = formattedName + "Bg" + path.extname(originalName);
    } else if (
      file.fieldname === "poster" ||
      file.fieldname === "Sposter" ||
      file.fieldname === "Tposter"
    ) {
      finalName = formattedName + "Poster" + path.extname(originalName);
    }

    cb(null, finalName);
  },
});
const upload = multer({ storage: storage });

// Upload movies route
router.post("/movies", async (req, res) => {
  try {
    let Mname = req.body.Mname;
    Mname = formatName1(Mname);
    const releaseYear = req.body.release;
    const relaseDate = req.body.date;
    const overview = req.body.overview;
    let genress = req.body.genres;
    genress = genress.split(",");
    const link = req.body.link;
    const rate = req.body.rate;
    const ratingsNumber = req.body.ratingsNumber;
    const adult = req.body.adult === "true";
    const poster = req.body.poster;
    const bg = req.body.bg;
    const checking = await Movies.findOne({ name: Mname });
    console.log(poster);
    if (!checking) {
      const a = await Movies.create({
        name: Mname.split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" "),
        year: releaseYear,
        RelaseDate: relaseDate,
        story: overview,
        Rate: rate,
        ratingsNumber: ratingsNumber,
        poster: poster,
        bgPic: bg,
        trailerLink: link,
        genres: genress,
        forAdults: adult,
      });
      const b = await RateBase.create({
        postID: a._id,
        name: a.name,
        rate: rate,
        numberOfPeople: ratingsNumber,
      });
      const c = await Comments.create({ postID: a._id, name: a.name });
      if (a && b && c) {
        res.status(200).json("uploaded");
        console.log(a, b, c);
        return;
      }
    } else {
      res.status(200).json("failed");
      return;
    }
  } catch (error) {
    res.status(400).json("Sorry, there was an ERROR!:" + error.message);
    console.log("ERROR: " + error.message);
  }
});

// Upload series route
router.post("/series", async (req, res) => {
  try {
    let Sname = req.body.Sname;
    Sname = formatName1(Sname);
    const SreleaseYear = req.body.Srelease;
    const SrelaseDate = req.body.Sdate;
    const Soverview = req.body.Soverview;
    let Sgenress = req.body.Sgenres;
    Sgenress = Sgenress.split(",");
    const Slink = req.body.Slink;
    const Srate = req.body.Srate;
    const SratingsNumber = req.body.SratingsNumber;
    const Sadult = req.body.Sadult === "true";
    const Sposter = req.body.Sposter;
    const Sbg = req.body.Sbg;
    console.log(Sbg);

    const checking = await Series.findOne({ name: Sname });
    console.log(checking);
    if (!checking) {
      const a = await Series.create({
        name: Sname.split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" "),
        year: SreleaseYear,
        RelaseDate: SrelaseDate,
        story: Soverview,
        Rate: Srate,
        ratingsNumber: SratingsNumber,
        poster: Sposter,
        bgPic: Sbg,
        trailerLink: Slink,
        genres: Sgenress,
        forAdults: Sadult,
      });
      const b = await RateBase.create({
        postID: a._id,
        name: a.name,
        rate: Srate,
        numberOfPeople: SratingsNumber,
      });
      const c = await Comments.create({ postID: a._id, name: a.name });
      if (a && b && c) {
        res.status(200).json("uploaded");
        console.log(a, b, c);
        return;
      }
      if (a && b && c) {
        res.status(200).json("uploaded");
        return;
      }
    } else {
      res.status(200).json("failed");
      return;
    }
  } catch (error) {
    res.status(400).json("Sorry, there was an ERROR!:" + error.message);
    console.log("ERROR: " + error.message);
  }
});

// Upload tvshows route
router.post("/tvshows", async (req, res) => {
  try {
    let Tname = req.body.Tname;
    Tname = formatName1(Tname);
    const TreleaseYear = req.body.Trelease;
    const TrelaseDate = req.body.Tdate;
    const Toverview = req.body.Toverview;
    let Tgenress = req.body.Tgenres;
    Tgenress = Tgenress.split(",");
    const Tlink = req.body.Tlink;
    const Trate = req.body.Trate;
    const TratingsNumber = req.body.TratingsNumber;
    const Tadult = req.body.Sadult === "true";
    const Tposter = req.body.Tposter;
    const Tbg = req.body.Tbg;

    const checking = await TVshows.findOne({ name: Tname });
    if (!checking) {
      const a = await TVshows.create({
        name: Tname.split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" "),
        year: TreleaseYear,
        RelaseDate: TrelaseDate,
        story: Toverview,
        Rate: Trate,
        ratingsNumber: TratingsNumber,
        poster: Tposter,
        bgPic: Tbg,
        trailerLink: Tlink,
        genres: Tgenress,
        forAdults: Tadult,
      });
      const b = await RateBase.create({
        postID: a._id,
        name: a.name,
        rate: Trate,
        numberOfPeople: TratingsNumber,
      });
      const c = await Comments.create({ postID: a._id, name: a.name });
      if (a && b && c) {
        res.status(200).json("uploaded");
        console.log(a, b, c);
        return;
      }
    } else {
      res.status(200).json("failed");
      return;
    }
  } catch (error) {
    res.status(400).json("Sorry, there was an ERROR!:" + error.message);
    console.log("ERROR: " + error.message);
  }
});

module.exports = router;
