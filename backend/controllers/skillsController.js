const Skills = require("../models/skill");
//get all skills
exports.getSkills = async (req, res) => {
  try {
    const skills = await Skills.find();
    res.json(skills);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
