const mongoose = require("../db.js");
const postSchema = new mongoose.Schema({
  // 名称
  title: {
    type: String,
    default: "draw your mind",
  },
  //   内容
  content: {
    type: String,
    default: "# draw your mind",
  },
  //   标签
  tags: {
    type: [String],
    default: [],
  },
  //   摘要
  summary: {
    type: String,
    default: "need some summary",
  },
  //   状态
  status: {
    type: String,
    default: "Draft",
  },
  watched: {
    type: Number,
    default: 0,
  },
  like: {
    type: Number,
    default: 0,
  },
  password: {
    type: String,
    default: null,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  cover: {
    type: String,
    default: "https://www.notion.so/images/page-cover/solid_beige.png",
  },
});

module.exports = mongoose.model("Post", postSchema, "post");
