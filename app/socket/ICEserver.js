module.exports = (io, socket) => {
  let callRoom = "";
  socket.on("join", ({ target }) => {
    socket.join(target);
    callRoom = target;
    socket.to(target).emit("joined", { sender: socket.id });
  });
  socket.on("offer", ({ sdp, target }) => {
    console.log("offer", socket.rooms);
    socket.to(target).emit("offer", { sdp, sender: socket.id });
  });
  socket.on("answer", ({ sdp, target }) => {
    socket.to(target).emit("answer", { sdp, sender: socket.id });
  });
  socket.on("left", async ({ target }) => {
    console.log("left");
    socket.leave(target);
    socket.to(target).emit("left", { sender: socket.id });
  });
  socket.on("ice-candidate", async ({ candidate, target }) => {
    socket.to(target).emit("ice-candidate", { candidate, sender: socket.id });
  });
  socket.on("hang-down-server", ({ id, roomId }) => {
    socket.to(roomId).emit("hang-down");
  });
  socket.on("disconnect", () => {
    console.log("call disconnect");
    socket.to(callRoom).emit("left", { sender: socket.id });
  });
};
