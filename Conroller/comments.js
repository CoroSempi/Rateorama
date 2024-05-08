const express = require("express");

// Rateorama Schemes(models)
const UserLists = require("../Models/UsersLists");
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

module.exports = router;
