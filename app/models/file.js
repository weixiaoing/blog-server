const mongoose = require("../db.js");
const fileSchema = new mongoose.Schema(
  {
    hash: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("File", fileSchema, "file");
