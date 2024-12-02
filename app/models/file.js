const mongoose = require("../db.js");
const fileSchema = new mongoose.Schema({
  hash: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },    
  url: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("File", fileSchema, "file");
