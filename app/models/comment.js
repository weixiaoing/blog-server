const mongoose = require("../db.js");
const commentSchema = new mongoose.Schema({
  postId: {
    type: String,
    required: true,
  },

  content: {
    type: String,
    required: true,
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comments",
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  replies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comments",
    },
  ],
  userId: String,
  name: String,
  avatar: String,
  website: String,
});

module.exports = mongoose.model("Comments", commentSchema, "comment");
