const express = require("express");
const bodyParser = require("body-parser");
const registerUserHandlers = require("./userHandler");
const ICEServerHandlers = require("./ICEserver");
const PORT = 4000;
const logger = require("./logger");
const app = express();
require("dotenv").config("../env");
const server = require("http").Server(app);
const cors = require("cors");
const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const { expressjwt } = require("express-jwt");
const secretKey = "Hello";
const tokenStr = jwt.sign({ username: "admin", password: "123456" }, secretKey);
const socketIO = new Server(4040, {
  cors: true,
});
app.use(cors());
app.use(bodyParser.json());
// app.use(
//   expressjwt({ secret: secretKey, algorithms: ["HS256"] }).unless({
//     path: ["/api"],
//   })
// );
app.get("/api", (req, res) => {
  logger.info("Handling / route");
  res.json({
    message: "Hello world",
  });
});

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
