const mongoose = require("mongoose");

const subSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  contentID: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
});

const UserLists = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  favorites: [subSchema],
  watchLater: [subSchema],
});
module.exports = mongoose.model("UserLists", UserLists);
