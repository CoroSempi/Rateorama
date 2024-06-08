const mongoose = require("mongoose");

var s = new Date();
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const subSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  timestamp: {
    type: String,
    default:
      s.getDate() +
      " " +
      months[s.getMonth()] +
      " " +
      s.getFullYear() +
      " " +
      "- " +
      s.getHours() +
      ":" +
      s.getMinutes(),
  },
  content: {
    type: String,
    required: true,
  },
});

// subSchema.pre("save", function (next) {
//   this.timestamp =
//     s.getDate() +
//     " " +
//     months[s.getMonth()] +
//     " " +
//     s.getFullYear() +
//     " " +
//     "- " +
//     s.getHours() +
//     ":" +
//     s.getMinutes();
//   next();
// });

const Comments = new mongoose.Schema({
  postID: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  movieComments: [subSchema],
});

module.exports = mongoose.model("Comments", Comments);
