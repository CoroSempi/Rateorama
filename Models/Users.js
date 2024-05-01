

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Users = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
});
// Middleware for Password encryption
Users.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
}); 
Users.post("save", async function (next) {
  console.log("done")
});
module.exports = mongoose.model("Users", Users);
