const Conversation = require("../models/conversation");
const chatUpdates = require("./updates/chat");

const groupChatHistoryHandler = async (socket, data) => {
  try {
    // const { _id } = socket.user;
    console.log(data);
    const { _id } = data;

    chatUpdates.updateChatHistory(_id.toString(), socket.id);
  } catch (err) {
    console.log(err);
  }
};

module.exports = groupChatHistoryHandler;
