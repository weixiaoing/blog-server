const mongoose = require("../db.js");
const usersSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
    email: String,
    role: {
      type: String,
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Users", usersSchema, "users");
