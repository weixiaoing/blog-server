const { getCommentList, createComment, replay } = require("../control/comment");
const comments = require("../models/comment");

module.exports = (io, socket) => {
  socket.join("Home");
  socket.to("Home").emit("info", { text: `${socket.id}进入了聊天室` });
  socket.on("secrectMessage", ({ toId, msg }) => {
    io.to(toId).emit("secrectMessage", socket.id, msg);
  });

  socket.on("joinRoom", ({ room }) => {
    console.log("joinRoom", room);
    socket.join(room);

    getCommentList({ postId: room }).then((data) => {
      socket.emit("listInit", data);
    });
  });

  socket.on("send", ({ room = "Home", message }) => {
    console.log("send", room);
    console.log("message", message);

    createComment({ postId: room, ...message }).then((data) => {
      console.log(data);
      io.to(room).emit("chatList", data.data);
    });
  });
  socket.on("replay", ({ parentId, postId = "Home", content }) => {
    replay({
      postId,
      content,
      parentId,
    }).then((data) => {
      console.log(postId);
      io.to(postId).emit("subChatOut", data.data);
    });
  });
};
