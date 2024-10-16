const serverStore = require("../serverStore");
const roomsUpdates = require("./updates/rooms");

const roomPermissionHandler = (socket, data) => {
  const { roomId } = data;

  const participantDetails = {
    userId: data.request.userId,
    socketId: data.request.socketId,
  };

  const roomDetails = serverStore.getActiveRoom(roomId);
  serverStore.joinActiveRoom(roomId, participantDetails);
  // send information to users in room that they should prepare for incoming connection
  roomDetails.participants.forEach((participant) => {
    if (participant.socketId !== participantDetails.socketId) {
      // console.log(participant.socketId);
      // socket.to(participant.socketId.toString()).emit("conn-prepare", {
      //   connUserSocketId: participantDetails.socketId,
      //)}
      const io = serverStore.getSocketServerInstance();
      io.to(participant.socketId.toString()).emit("conn-prepare", {
        connUserSocketId: participantDetails.socketId,
      });
    }
  });

  roomsUpdates.updateRooms(roomDetails.roomCreator.socketId.toString());
  roomsUpdates.updateRooms(participantDetails.socketId.toString());
};

module.exports = roomPermissionHandler;
