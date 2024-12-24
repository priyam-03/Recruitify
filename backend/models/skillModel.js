const mongoose = require('mongoose');

const skillsSchema = new mongoose.Schema({
  skill: {
    type: String,
    required: true,
    trim: true,
  },
});

const Skill = mongoose.model('Skill', skillsSchema);
module.exports = Skill;
