const express = require("express");
const multer = require("multer");
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
// const tokenStr = jwt.sign({ username: "admin", password: "123456" }, secretKey);
const socketIO = new Server(4040, {
  cors: true,
});
const postRoutes = require("./routes/post");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// file upload
const uploadPath = path.join(process.cwd(), "uploads");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${req.body.index}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

// route
app.get("/test", (req, res) => {
  res.json({
    message: "Hello world",
  });
});
app.use("/post", postRoutes);

app.post("/upload", upload.single("img"), (req, res) => {
  res.send("ok");
});

app.post("/merge", async (req, res) => {
  let files = fs.readdirSync(path.join(uploadPath));
  files = files.sort((a, b) => a.split("-")[0] - b.split("-")[0]);
  const writePath = path.join(
    process.cwd(),
    `video`,
    `${req.body.fileName}.mp4`
  );
  files.forEach((item) => {
    fs.appendFileSync(writePath, fs.readFileSync(path.join(uploadPath, item)));
    fs.unlinkSync(path.join(uploadPath, item));
  });

  res.send("ok");
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
