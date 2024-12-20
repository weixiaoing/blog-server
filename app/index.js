const express = require("express");

const bodyParser = require("body-parser");
const registerUserHandlers = require("./socket/userHandler");
const ICEServerHandlers = require("./ICEserver");
const errorHandler = require("./middleware/errorHandler");
const logger = require("logger");
const app = express();
require("dotenv").config("../env");
const server = require("http").Server(app);
const cors = require("cors");
const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const { expressjwt } = require("express-jwt");
const secretKey = "Hello";
const fs = require("fs");
const path = require("path");
// 服务器响应端口
const PORT = process.env.SERVER_PORT || 4000;
// socket端口
const SOCKETPORT = process.env.SOCKER_PORT || 4040;
const socketIO = new Server(SOCKETPORT, {
  cors: true,
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// route
app.get("/", (req, res) => {
  res.json({
    message: "Hello !",
  });
});
app.use("/post", require("./routes/post"));

app.use("/file", require("./routes/file"));
app.use("/summary", require("./routes/summary"));
app.use(express.static("static"));
app.use(errorHandler());
server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

socketIO.socketsJoin("Home");
socketIO.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} 用户已连接!`);
  registerUserHandlers(socketIO, socket);
  ICEServerHandlers(socketIO, socket);
  console.log("rooms", socketIO.sockets.adapter.rooms.size);

  // socket.emit("memberCount", { count: io.sockets.adapter.rooms.size });
  socket.on("disconnect", () => {
    console.log(`🔥: ${socket.id} 用户已断开连接!`);
  });
});
