const express = require("express");

// Rateorama Schemes(models)
const UserLists = require("../Models/UsersLists");
// Create a Router
const router = express.Router();
// Middleware for parsing JSON
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

module.exports = router;
