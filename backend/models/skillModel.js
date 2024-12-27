const mongoose = require('mongoose');

const skillsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

const Skill = mongoose.model('Skill', skillsSchema);
module.exports = Skill;
