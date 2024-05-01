

const mongoose = require("mongoose");

const subSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  seen: {
    type: Boolean,
    default: false,
    required: true,
  },
});

const Mails = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  usermails: [subSchema],
});
module.exports = mongoose.model("Mails", Mails);
