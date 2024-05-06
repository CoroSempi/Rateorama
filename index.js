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

app.use(cors({ origin: "*" }));
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

let port = process.env.PORT || 3000;

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
app.get("/", (req, res) => {
  res.status(200).send("<h1>Rateorama Server</h1>");
});

app.get("/Admins", (req, res) => {
  try {
    res.status(200).render("adminSignin");
    return;
  } catch (error) {
    res.status(400).send("Sorry there is an ERROR!");
    console.log("ERROR !:" + error.message);
  }
});
app.get("/test", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.send("Test route");
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

