// models/Skill.js
const mongoose = require("mongoose");

// Define the schema with timestamps
const SkillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 2,
    },
  },
  {
    timestamps: true, // Enables createdAt and updatedAt fields
  }
);

// Create the model
const Skill = mongoose.model("Skill", SkillSchema);

module.exports = Skill;
