const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const conversationSchema = new Schema({
  type: {
    type: String,
    enum: ["DIRECT", "GROUP"],
    default: "DIRECT",
  },
  name: {
    type: String,
  },
  participants: [
    {
      type: Schema.Types.ObjectId,
      ref: "Userauth",
    },
  ],
  messages: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
    default: [],
  },
});

module.exports = mongoose.model("Conversation", conversationSchema);
