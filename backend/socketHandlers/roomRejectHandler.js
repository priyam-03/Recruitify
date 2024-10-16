const serverStore = require("../serverStore");
const roomsUpdates = require("./updates/rooms");

const roomRejectHandler = (socket, data) => {
  const { roomId } = data;

  const participantDetails = {
    userId: data.request.userId,
    socketId: data.request.socketId,
  };
  const roomDetails = serverStore.getActiveRoom(roomId);
  //send to this socket id that you are not allowed to enter
  const io = serverStore.getSocketServerInstance();
  serverStore.removeJoinRequest(roomId, participantDetails);
  io.to(participantDetails.socketId.toString()).emit("conn-reject", {
    message: "Connection rejected by room creator",
  });
  roomsUpdates.updateRooms(roomDetails.roomCreator.socketId.toString());
};

module.exports = roomRejectHandler;
