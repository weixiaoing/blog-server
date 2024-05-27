const mongoose = require("../db.js");
const usersSchema = new mongoose.Schema({
  username: String,
  password: String,
});

module.exports = mongoose.model("Users", usersSchema, "users");
