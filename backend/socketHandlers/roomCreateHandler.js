const serverStore = require("../serverStore");
const roomsUpdates = require("./updates/rooms");

const roomCreateHandler = (socket, data = null) => {
  console.log("handling room create event");
  const socketId = socket.id;
  const userId = socket.user._id;

  const roomDetails = serverStore.addNewActiveRoom(userId, socketId);
  if (data) serverStore.addAllParticipants(roomDetails.roomId, data);
  socket.emit("room-create", {
    roomDetails,
  });

  // if (!data) roomsUpdates.updateRooms(socketId.toString());
  roomsUpdates.updateRooms();
};

module.exports = roomCreateHandler;
