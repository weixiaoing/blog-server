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
  parent: {
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
  levelIdArray: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comments",
      default: null,
    },
  ],
  // 区分二级评论还是三级评论
  level: {
    type: Number,
    default: 0,
  },

  userId: String,
  name: String,
  avatar: String,
  website: String,
  email: String,
});

module.exports = mongoose.model("Comments", commentSchema, "comment");
