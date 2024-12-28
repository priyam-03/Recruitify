const Skill = require('../models/skillModel.js');  // Assuming Skill model is defined here

exports.fetchAllSkills = async (req, res) => {
  try {
    const skills = await Skill.find();  // Fetch all skills from MongoDB

    if (!skills || skills.length === 0) {
      return res.status(404).json({ error: "No skills found" });
    }

    res.status(200).json({ skills });
  } catch (error) {
    console.error('Error fetching skills:', error);

    res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
};
