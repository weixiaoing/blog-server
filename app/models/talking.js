const mongoose = require("../db.js");
const summarySchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Talk", summarySchema, "talk");
