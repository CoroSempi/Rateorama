const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const path = require("path");
const cors = require("cors");


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
app.use(express.static(__dirname + "/public"));
app.use(cors());
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

let port = 3000 || process.env.PORT;

run();
app.listen(port, () => {
  console.log(`SERVER RUN ON PORT ${port}`);
});

async function run() {
  await mongoose
    .connect(
      "mongodb+srv://seif:Liverpool6@seif.54v3nl4.mongodb.net/?retryWrites=true&w=majority&appName=seif"
    )
    .then(console.log("hh"));
}

app.get("/Admins", (req, res) => {
  try {
    res.status(200).render("adminSignin");
    return;
  } catch (error) {
    res.status(400).send("Sorry there is an ERROR!");
    console.log("ERROR !:" + error.message);
  }
});
//Connect to MongoDB using mongoose(ODM)
// mongoose
//   .connect("mongodb+srv://seif:Liverpool6@seif.54v3nl4.mongodb.net/")
//   .then(() => {
//     app.listen(port, () => {
//       console.log(`SERVER RUN ON PORT ${port}`);
//     });
//   })
//   .catch((e) => {
//     console.log(e.message);
//   });

app.get("/", (req, res) => {
  res.status(200).send("finally hellooooo");
});

// fetch("https://rateorama.vercel.app/HOME/search?keyword=dark")
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }
//     return response.json();
//   })
//   .then((data) => {
//     console.log(data);
//     console.log(
//       "========================================================================"
//     );
//   })
//   .catch((error) => {
//     console.error("There was a problem with the fetch operation:", error);
//   });

fetch("https://rateorama.vercel.app/home/toprated")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);
    console.log(
      "========================================================================"
    );
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });
