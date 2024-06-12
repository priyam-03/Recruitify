const serverStore = require("../serverStore");

const disconnectHandler = (socket) => {
  serverStore.removeConnectedUser(socket.id);
};

module.exports = disconnectHandler;
