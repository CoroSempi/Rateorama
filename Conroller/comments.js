const express = require("express");

// Rateorama Schemes(models)
const Comment = require("../Models/Comments");
const Users = require("../Models/Users");
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

router.post("/add", async (req, res) => {
  try {
    const id = req.body.postid;
    const data = {
      userName: req.body.username,
      content: req.body.comment,
    };
    const checking1 = await Users.find({ userName: data.userName });
    const checking2 = await Comment.findOne({ postID: id });
    if (checking1 && checking2) {
      checking2.movieComments.push(data);
      const done = await checking2.save();
      if (done) {
        res.status(200).json({ message: "Comment added successfully" });
        return;
      }
    } else {
      res
        .status(400)
        .json({ message: "Something missing or went wrong went wrong" });
      return;
    }
  } catch (error) {
    res.status(400).send("Sorry there is an ERROR!");
    console.log("ERROR !:" + error.message);
  }
});

router.put("/update", async (req, res) => {
  try {
    const postid = req.body.postid;
    const commentid = req.body.commentid;
    const username = req.body.username;
    const content = req.body.comment;

    const user = await Users.findOne({ userName: username });
    if (!user) {
      return res.status(400).send("User not found");
    }

    const commentDoc = await Comment.findOne({ postID: postid });
    if (!commentDoc) {
      return res.status(404).send("Post not found");
    }

    const commentToUpdate = commentDoc.movieComments.find(
      (c) => c._id.toString() === commentid && c.userName === username
    );
    if (!commentToUpdate) {
      return res.status(404).send("Comment not found");
    }
    commentToUpdate.content = content;
    const done = await commentDoc.save();
    if (done) {
      res.status(200).json({ message: "Comment updated successfully" });
      return;
    } else {
      res.status(400).json({ message: "Something went wrong" });
      return;
    }
  } catch (error) {
    res.status(400).send("Sorry, there is an error!");
    console.log("ERROR!: " + error.message);
  }
});

router.get("/test", async (req, res) => {
  res.send("Hello World");
});

router.delete("/delete", async (req, res) => {
  try {
    const postid = req.body.postid;
    const commentid = req.body.commentid;
    const username = req.body.username;

    const user = await Users.findOne({ userName: username });
    if (!user) {
      return res.status(400).send("User not found");
    }

    const commentDoc = await Comment.findOne({ postID: postid });
    if (!commentDoc) {
      return res.status(404).send("Post not found");
    }

    const commentIndex = commentDoc.movieComments.findIndex(
      (c) => c._id.toString() === commentid && c.userName === username
    );
    if (commentIndex === -1) {
      return res.status(404).send("Comment not found");
    }

    commentDoc.movieComments.splice(commentIndex, 1);
    const done = await commentDoc.save();
    if (done) {
      res.status(200).json({ message: "Comment deleted successfully" });
      return;
    } else {
      res.status(400).json({ message: "Something went wrong" });
      return;
    }
  } catch (error) {
    res.status(400).send("Sorry, there is an error!");
    console.log("ERROR!: " + error.message);
  }
});

module.exports = router;
