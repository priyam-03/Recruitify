const serverStore = require("../serverStore");
const friendsUpdate = require("../socketHandlers/updates/friends");
const roomsUpdate = require("../socketHandlers/updates/rooms");
const newConnectionHandler = async (socket, io) => {
  const userDetails = socket.user;

  serverStore.addNewConnectedUser({
    socketId: socket.id,
    userId: userDetails._id,
  });

  // update pending friends invitations list
  friendsUpdate.updateFriendsPendingInvitations(userDetails._id.toString());

  // update friends list
  friendsUpdate.updateFriends(userDetails._id.toString());

  roomsUpdate.updateRooms(socket.id.toString());
};

module.exports = newConnectionHandler;
