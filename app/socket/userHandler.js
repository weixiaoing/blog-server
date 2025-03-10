const {
  getCommentList,
  createComment,
  replay,
  reply,
} = require("../control/comment");
const comments = require("../models/comment");

module.exports = (io, socket) => {
  socket.on("secrectMessage", ({ toId, msg }) => {
    io.to(toId).emit("secrectMessage", socket.id, msg);
  });
  socket.on("joinRoom", ({ room }) => {
    socket.join(room);
    getCommentList({ postId: room }).then((data) => {
      socket.emit("listInit", data);
    });
  });
  socket.on("send", ({ room = "Home", message }) => {
    createComment({ postId: room, ...message }).then((data) => {
      io.to(room).emit("chatList", data.data);
    });
  });
  socket.on("reply", ({ postId = "Home", ...data } = data) => {
    reply({ postId, ...data })
      .then((data) => {
        io.to(postId).emit("subChatOut", data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });
};
