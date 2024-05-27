module.exports = (io, socket) => {
  socket.on("offer", ({ sdp, myId, roomId }) => {
    console.log("offer");
    socket.to(roomId).emit("call", { sdp });
  });
  socket.on("answer", ({ sdp, myId, roomId }) => {
    console.log("answer");
    socket.to(roomId).emit("answer", { sdp });
  });
  socket.on("candidate", async ({ candidate, myId, roomId }) => {
    // console.log(candidate);
    socket.to(roomId).emit("candidate", { candidate });
  });
};
