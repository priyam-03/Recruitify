const mongoose = require("mongoose");

const skillsSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    trim: true,
    minlength: 2,
    required: true,
  },
});

const Skill = mongoose.model("Skill", skillsSchema);
module.exports = Skill;
