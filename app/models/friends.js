const mongoose = require("../db.js");
const friendsSchema = new mongoose.Schema({
  avatar: {
    type: String,
    required: true,
  },
  link: {
    type: Date,
    default: Date.now,
  },
  intro: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Friends", friendsSchema, "friends");
