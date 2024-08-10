const serverStore = require("../serverStore");
const roomsUpdates = require("./updates/rooms");

const roomJoinHandler = (socket, data) => {
  const { roomId } = data;

  const participantDetails = {
    userId: socket.user._id,
    socketId: socket.id,
  };

  const roomDetails = serverStore.getActiveRoom(roomId);
  socket
    .to(roomDetails.roomCreator.socketId)
    .emit("joinRequest", participantDetails);
  serverStore.joinRequest(roomId, participantDetails);

  roomsUpdates.updatePermission();
};

module.exports = roomJoinHandler;
