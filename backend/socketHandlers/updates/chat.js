const Conversation = require("../../models/conversation");
const serverStore = require("../../serverStore");

const updateChatHistory = async (
  conversationId,
  toSpecifiedSocketId = null
) => {
  console.log("toSpecifiedSocketId" + toSpecifiedSocketId);
  const conversation = await Conversation.findById(conversationId).populate({
    path: "messages",
    model: "Message",
    populate: {
      path: "author",
      model: "Userauth",
      select: "name _id avatar",
    },
  });
  // console.log(conversation + " conversation");
  if (conversation) {
    const io = serverStore.getSocketServerInstance();
    if (toSpecifiedSocketId) {
      // initial update of chat history
      console.log(conversation.type);
      if (conversation.type == "GROUP") {
        return io.to(toSpecifiedSocketId).emit("group-chat-history", {
          messages: conversation.messages,
          participants: conversation.participants,
          _id: conversation._id,
        });
      } else {
        return io.to(toSpecifiedSocketId).emit("direct-chat-history", {
          messages: conversation.messages,
          participants: conversation.participants,
          _id: conversation._id,
        });
      }
    }

    // check if users of this conversation are online
    // if yes emit to them update of messages
    if (conversation.type == "GROUP") {
      conversation.participants.forEach((_id) => {
        const activeConnections = serverStore.getActiveConnections(
          _id.toString()
        );
        activeConnections.forEach((socketId) => {
          io.to(socketId).emit("group-chat-history", {
            messages: conversation.messages,
            participants: conversation.participants,
            _id: conversation._id,
          });
        });
      });
    } else {
      conversation.participants.forEach((_id) => {
        console.log(_id);
        const activeConnections = serverStore.getActiveConnections(
          _id.toString()
        );
        console.log(activeConnections);
        activeConnections.forEach((socketId) => {
          // console.log(socketId);
          io.to(socketId).emit("direct-chat-history", {
            messages: conversation.messages,
            participants: conversation.participants,
            _id: conversation._id,
          });
        });
      });
    }
  }
};

module.exports = { updateChatHistory };
