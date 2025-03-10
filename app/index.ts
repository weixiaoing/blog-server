import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import log from "./common/chalk";
import env from "./config/env";
import { errorHandler } from "./middleware/common";
import fileRouter from "./routes/file";
import postRouter from "./routes/post";
import summryRouter from "./routes/summary";
import talkRotuer from "./routes/talk";
import ICEServerHandlers from "./socket/ICEserver";
import userHandlers from "./socket/userHandler";
const app = express();
const server = new http.Server(app);
// 服务器响应端口
const PORT = env.SERVER_PORT || 4000;
// socket端口
const SOCKETPORT = env.SOCKET_PORT || 4040;
const socketIO = new Server(SOCKETPORT as number, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({
    message: "Hello !",
  });
});
app.use("/post", postRouter);
app.use("/download", express.static("static"));
app.use("/file", fileRouter);
app.use("/summary", summryRouter);
app.use("/talk", talkRotuer);
app.use(errorHandler);

server.listen(PORT, () => {
  log.success(`服务器端口: ${PORT}`);
});

socketIO.on("connection", (socket) => {
  log.info(`⚡: ${socket.id} 用户已连接!`);
  userHandlers(socketIO, socket);
  ICEServerHandlers(socketIO, socket);
  console.log("rooms", socketIO.sockets.adapter.rooms.size);
  socket.on("disconnect", () => {
    log.info(`🔥: ${socket.id} 用户已断开连接!`);
  });
});
