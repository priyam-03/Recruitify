const serverStore = require("../serverStore");
const roomsUpdates = require("./updates/rooms");

const roomJoinHandler = (socket, data) => {
  const { roomId } = data;

  const participantDetails = {
    userId: socket.user._id,
    socketId: socket.id,
    name: socket.user.name,
  };

  const roomDetails = serverStore.getActiveRoom(roomId);
  serverStore.joinRequestRomm(roomId, participantDetails);
  // serverStore.joinActiveRoom(roomId, participantDetails);
  // send information to users in room that they should prepare for incoming connection
  // roomDetails.participants.forEach((participant) => {
  //   if (participant.socketId !== participantDetails.socketId) {
  //     socket.to(participant.socketId).emit("conn-prepare", {
  //       connUserSocketId: participantDetails.socketId,
  //     });
  //   }
  // });

  roomsUpdates.updateRooms(roomDetails.roomCreator.socketId.toString());
};

module.exports = roomJoinHandler;
