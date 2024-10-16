const serverStore = require("../serverStore");

const disconnectHandler = (socket) => {
  serverStore.removeConnectedUser(socket.id);
  const roomIds = serverStore.leaveActiveRoomBySocketId(socket.id);
  if (roomIds && roomIds.length > 0) {
    roomIds.forEach((roomId) => {
      const activeRoom = serverStore.getActiveRoom(roomId);
      activeRoom.participants.forEach((participant) => {
        socket.to(participant.socketId).emit("room-participant-left", {
          connUserSocketId: socket.id,
        });
      });
    });
  }
};

module.exports = disconnectHandler;
