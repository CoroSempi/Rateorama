const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const path = require("path");

const dashboard = require("./Conroller/dashboard");
const users = require("./Conroller/users");
const home = require("./Conroller/home");
const moviesRoute = require("./Conroller/movies");
const seriesRoute = require("./Conroller/series");
const tvshowsRoute = require("./Conroller/tvshows");
const userlists = require("./Conroller/userlists");
const profile = require("./Conroller/profile");
// Rateorama Schemes(models)
const Users = require("./Models/Users");
const Mails = require("./Models/Mails");
const Comments = require("./Models/Comments");
const RateBase = require("./Models/RateBase");
const UserLists = require("./Models/UsersLists");

// Create a Server
const app = express();

//routes
app.use("/dashboard", dashboard);
app.use("/users", users);
app.use("/home", home);
app.use("/movies", moviesRoute);
app.use("/series", seriesRoute);
app.use("/tvshows", tvshowsRoute);
app.use("/userlists", userlists);
app.use("/profile", profile);

// Middleware for parsing JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./Views/dashboard/public")));
app.set("view engine", "ejs");

let port = 3000 || process.env.PORT;

//Connect to MongoDB using mongoose(ODM)
mongoose
  .connect("mongodb://localhost:27017/Rateorama")
  .then(() => {
    app.listen(port, () => {
      console.log(`SERVER RUN ON PORT ${port}`);
    });
  })
  .catch((e) => {
    console.log(e.message);
  });

// async function use() {
//   try {
//     const hashed = await bcrypt.hash("1234", 10);
//     console.log(hashed);
//     const mm = await Admins.create({
//       userName: "abdo",
//       password: hashed,
//     });

//     console.log(mm);
//   } catch (error) {
//     console.log(error.message);
//   }
// }
// use();

// ahmed
// alioo
// momo

// async function use() {
//   try {
//     const mm = await Users.create({
//       userName: "alii",
//       email: "DZAF@YAHOO.COM",
//       password: "hello seif",
//     });
//     console.log(mm);
//   } catch (error) {
//     console.log(error.message);
//   }
// }
// use();
// async function mailll() {
//   try {
//     const mm = await Mails.create({
//       userName: "alii",
//       content: "hello momo",
//     });
//     console.log(mm)
//   } catch (error) {
//     console.log(error.message);
//   }
// }
// mailll()
// async function mailll() {
//   try {
//     const mail = {
//       content: "fsefgfergergre",
//     };

//     const cc = await Mails.findOneAndUpdate(
//       { userName: "seif" },
//       { $push: { usermails: mail } },
//       { new: true }
//     );

//     console.log(cc);
//   } catch (error) {
//     console.log(error.message);
//   }
// }

// mailll()
// async function run() {
//   try {
//     const cc = await Comments.create({
//       moviesID: 12,
//       movieComments: [
//         {
//           userName: "seif",
//           content: "gfergre",
//         },
//       ],
//     });
//     console.log(cc);
//   } catch (error) {
//     console.log(error.message);
//   }
// }

// async function run() {
//   try {
//     const comment = {
//       userName: "ali",
//       content: "erehrthtrherhetrh6ujej",
//     };

//     const cc = await Comments.findOneAndUpdate(
//       { moviesID: 12 },
//       { $push: { movieComments: comment } },
//       { new: true }
//     );

//     // console.log(cc);
//   } catch (error) {
//     console.log(error.message);
//   }
// }

// run();

// run();
// async function run2() {
//   ss = await Comments.findOne({moviesID:12});
//   console.log(ss)
// }

// run2()
// async function run() {
//   try {
//     const updatedComment = {
//       userName: "ahmed",
//       commentID: "1",
//       content: "Updated content",
//     };

//     const cc = await Comments.findOneAndUpdate(
//       { moviesID: 12, "movieComments.userName": "ahmed" },
//       { $set: { "movieComments.$": updatedComment } },
//       { new: true }
//     );

//     console.log(cc);
//   } catch (error) {
//     console.log(error.message);
//   }
// }

// async function run() {
//   try {
//     const b = await Movies.exists({ name: "Shutter Island" });
//     if (b === null) {
//       const a = await Movies.create({
//         name: "Shutter Island",
//         year: 2010,
//         RelaseDate: "Feb 01, 2024",
//         story:
//           "Teddy Daniels and Chuck Aule, two US marshals, are sent to an asylum on a remote island in order to investigate the disappearance of a patient, where Teddy uncovers a shocking truth about the place.",
//         Rate: 4.1,
//         poster: "./pubic/moviespics/shuuterIslandPoseter",
//         bgPic: "./pubic/moviespics/shuuterIslandBg",
//         trailerLink: "https://www.youtube.com/watch?v=YDGldPitxic",
//         genres: ["action", "hrror"],
//         forAdults: true,
//       });

//       console.log(a);
//       await a.save();
//     }
//   } catch (error) {
//     console.log(error.message);
//   }
// }
// run();
// async function m() {
//   const wwe = await Movies.find();
//   console.log(wwe);
// }
// m();
