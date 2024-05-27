require("dotenv").config("./env");
const mongoose = require("mongoose");
// 数据库集合配置
// 1.定义数据集合的结构：定义出集合中有哪些属性，属性值是什么类型。

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connect successfully");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = mongoose;
