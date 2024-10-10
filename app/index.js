const express = require("express");

const bodyParser = require("body-parser");
const registerUserHandlers = require("./socket/userHandler");
const ICEServerHandlers = require("./ICEserver");
const PORT = 4000;
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

const socketIO = new Server(4040, {
  cors: true,
});
const postRoutes = require("./routes/post");
const fileRoutes = require("./routes/file");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// route
app.get("/test", (req, res) => {
  res.json({
    message: "Hello world",
  });
});
app.use("/post", postRoutes);

// app.use("/file", fileRoutes);
// app.use(express.static("static"));
server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

socketIO.socketsJoin("Home");
socketIO.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} 用户已连接!`);
  registerUserHandlers(socketIO, socket);
  ICEServerHandlers(socketIO, socket);
  socket.on("disconnect", () => {
    console.log(`🔥: ${socket.id} 用户已断开连接!`);
  });
});
