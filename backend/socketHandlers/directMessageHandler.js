const Message = require("../models/message");
const Conversation = require("../models/conversation");
const chatUpdates = require("./updates/chat");
const {pub,sub}  = require("./pubSub.js");
const directMessageHandler = async (socket, data) => {
  try {
    console.log("direct message event is being handled");

    const { _id } = socket.user;
    const { receiverUserId, content } = data;
    console.log(receiverUserId);
    // create new message
    const message = await Message.create({
      content: content,
      author: _id,
      date: new Date(),
      type: "DIRECT",
    });

    // find if conversation exist with this two users - if not create new
    const conversation = await Conversation.findOne({
      participants: { $all: [_id, receiverUserId] },
    });

    if (conversation) {
      conversation.messages.push(message._id);
      await conversation.save();

      // perform and update to sender and receiver if is online
      // chatUpdates.updateChatHistory(conversation._id.toString());
      pub.publish("direct-message",JSON.stringify({
        conversationId: conversation._id.toString(),
        senderId: _id,
      }))
    } else {
      // create new conversation if not exists
      const newConversation = await Conversation.create({
        messages: [message._id],
        participants: [_id, receiverUserId],
      });

      // perform and update to sender and receiver if is online
      // chatUpdates.updateChatHistory(newConversation._id.toString());
      pub.publish("direct-message",JSON.stringify({
        conversationId: newConversation._id.toString(),
      }))
      console.log("Message published to Redis");
    }
    
  } catch (err) {
    console.log(err);
  }
};


sub.subscribe("direct-message",()=>{
  console.log("Subscribed to direct-message channel");
  sub.on("message",async(channel,message)=>{
    if(channel==="direct-message"){
      const {conversationId} = JSON.parse(message);
      await chatUpdates.updateChatHistory(conversationId);
    }
  })
});


module.exports = directMessageHandler;
