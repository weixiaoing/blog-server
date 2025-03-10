require("dotenv").config("../env");
const mongoose = require("mongoose");


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MonggoDB 连接成功");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = mongoose;
