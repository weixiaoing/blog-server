const comments = require("./models/comment");

module.exports = (io, socket) => {
  socket.join("Home");
  socket.to("Home").emit("info", { text: `${socket.id}进入了聊天室` });
  socket.on("secrectMessage", ({ toId, msg }) => {
    socket.to(toId).emit("secrectMessage", socket.id, msg);
  });

  socket.on("joinRoom", ({ room }) => {
    console.log("joinRoom", room);
    socket.join(room);
    try {
      comments.find({ postId: room }).then((data) => {
        setTimeout(() => {
          socket.emit(
            "listInit",
            data
              .map((item) => {
                console.log("time", item.timeAt);
                return { msg: item.text, timeAt: Number(item.timeAt) };
              })
              .sort((a, b) => b.timeAt - a.timeAt)
          );
        });
      });
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("send", ({ room = "Home", msg }) => {
    console.log("send", room);
    const timeAt = Date.now();
    try {
      comments.create({ postId: room, text: msg, timeAt }).then((data) => {
        console.log(data.timeAt);
      });
    } catch (error) {
      console.log(error);
    }
    console.log("timeAt", timeAt);
    io.to(room).emit("chatList", {
      msg,
      timeAt,
    });
  });

  // socket.on("offer", ({ offer, roomId }) => {
  //   console.log("offer", offer, roomId);
  //   socket.to(roomId).emit("offer", offer, roomId);
  // });

  // socket.on("ice-candidate", (candidate, roomId) => {
  //   console.log("icecandidate", roomId);
  //   socket.broadcast.to(roomId).emit("ice-candidate", candidate);
  // });

  // socket.on("answer", (answer, roomId) => {
  //   console.log("answer", roomId);
  //   socket.broadcast.to(roomId).emit("answer", answer);
  // });
};
