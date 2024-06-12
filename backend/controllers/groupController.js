const Conversation = require("../models/conversation");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { ObjectId } = require("mongodb");
exports.addGroup = catchAsyncErrors(async (req, res, next) => {
  try {
    req.body.newCluster.map((c) => {
      return new ObjectId(c);
    });
    var participants = req.body.newCluster;
    participants.push(req.user.id);
    const conversation = new Conversation({
      type: "GROUP",
      name: req.body.name,
      participants,
    });
    await conversation.save();
    res.status(200).json({
      success: true,
    });
  } catch (e) {
    console.log(e);
  }
});

exports.getGroup = catchAsyncErrors(async (req, res, next) => {
  try {
    const group = await Conversation.find({
      participants: { $in: [req.user.id] },
      type: "GROUP",
    });

    res.status(200).json({
      success: true,
      group,
    });
  } catch (e) {
    console.log(e);
  }
});
