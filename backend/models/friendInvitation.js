const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const friendInvitationSchema = new Schema({
  senderId: {
    type: Schema.Types.ObjectId,
    ref: "Userauth",
  },
  receiverId: {
    type: Schema.Types.ObjectId,
    ref: "Userauth",
  },
});

module.exports = mongoose.model("FriendInvitation", friendInvitationSchema);
