const mongoose = require("../db.js");
const summarySchema = new mongoose.Schema({
  content: {
    type: String,

    required: true,
  },
  postId: {
    type: String,

    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Summary", summarySchema, "summary");
