const mongoose = require("../db.js");
const commentSchema = new mongoose.Schema({
  postId: String,
  text: String,
  timeAt: String,
});

module.exports = mongoose.model("Comments", commentSchema, "comment");
