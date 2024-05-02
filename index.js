const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Import route handlers
const dashboard = require("./Conroller/dashboard");
const users = require("./Conroller/users");
const home = require("./Conroller/home");
const moviesRoute = require("./Conroller/movies");
const seriesRoute = require("./Conroller/series");
const tvshowsRoute = require("./Conroller/tvshows");
const userlists = require("./Conroller/userlists");
const profile = require("./Conroller/profile");

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// Routes
app.use("/dashboard", dashboard);
app.use("/users", users);
app.use("/home", home);
app.use("/movies", moviesRoute);
app.use("/series", seriesRoute);
app.use("/tvshows", tvshowsRoute);
app.use("/userlists", userlists);
app.use("/profile", profile);

// Set view engine
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

const port = process.env.PORT || 3000;

run().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});

async function run() {
  try {
    await mongoose.connect(
      "mongodb+srv://<username>:<password>@<cluster>/<database>?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1); // Exit the process if unable to connect to MongoDB
  }
}

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
