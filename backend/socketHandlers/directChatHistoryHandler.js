const Conversation = require("../models/conversation");
const chatUpdates = require("./updates/chat");
const {pub,sub}  = require("./pubSub.js");


const directChatHistoryHandler = async (socket, data) => {
  try {
    const { _id } = socket.user;
    const { receiverUserId } = data;

    const conversation = await Conversation.findOne({
      participants: { $all: [_id, receiverUserId] },
      type: "DIRECT",
    });

    console.log(conversation);
    if (conversation) {
      // chatUpdates.updateChatHistory(conversation._id.toString(), socket.id);
      pub.publish("direct-chat-history",JSON.stringify({
        conversationId: conversation._id.toString(),
        receiverId:socket.id
      }))
    }
  } catch (err) {
    console.log(err);
  }
};

sub.subscribe("direct-chat-history",()=>{
  console.log("Subscribed to direct-chat-history channel");
  sub.on("message",async(channel,message)=>{
    if(channel==="direct-chat-history"){
      const {conversationId,receiverId} = JSON.parse(message);
      await chatUpdates.updateChatHistory(conversationId,receiverId);
    }
  })
});


module.exports = directChatHistoryHandler;
