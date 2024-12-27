const mongoose = require("mongoose");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const { uploadToS3, getFile, deleteFile } = require("../utils/fileupload");
const createUserSkillRelation = require('../graph_database/create_user_skill.js');
exports.addEducation = async (req, res) => {
  try {
    const userId = req.user._id;
    const content = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    if (
      !content.institution ||
      !content.designation ||
      !content.timeStrap.start_year
    ) {
      return res.status(400).json("p;lease fill all the fields");
    }

    const educationInfo = {
      institution: content.institution,
      specialization: content.specialization || "",
      designation: content.designation,
      gpa: content.gpa || "",
      otherInfo: content.otherInfo || "",
      timeStrap: {
        isCurrent: content.timeStrap.isCurrent,
        start_year: content.timeStrap.start_year,
        end_year: content.timeStrap.end_year,
      },
    };

    user.educations.push(educationInfo);

    await user.save();

    res.status(200).json(user.educations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.fetchEducations = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    return res.json(user.educations);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.addExperience = async (req, res) => {
  try {
    const userId = req.user._id;
    const content = req.body;
    const { organization, role, otherInfo, timeStrap } = content;
    if (!organization || !role) {
      return res
        .status(200)
        .json({ error: "Either oragnization or, role is empty" });
    }
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const experienceInfo = {
      organization: organization || "",
      role: role || "",
      otherInfo: otherInfo || "",
      timeStrap: {
        isCurrent: timeStrap.isCurrent,
        start_year: timeStrap.start_year,
        end_year: timeStrap.end_year,
      },
    };

    user.experiences.push(experienceInfo);

    await user.save();

    res.status(200).json(user.experiences);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.fetchExperiences = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    return res.json(user.experiences);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.addSkill = async (req, res) => {
  try {
    const userId = req.user._id;
    const content = req.body;
    const { skillId, level } = content;

    if (!skillId || !level) {
      return res
        .status(400)
        .json({ error: "either the skill id or, the level is empty" });
    }

    const user = await User.findById(userId).populate({
      path: "skills.skillId",
      model: "Skill"
    });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const skillInfo = {
      skillId: skillId,
      level: level,
    };

    user.skills.push(skillInfo);

    await user.save();

    createUserSkillRelation(userId,skillId,level);
    res.status(200).json(user.skills);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.fetchSkills = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).populate({
      path: "skills.skillId",
      model: "Skill"
    });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    return res.json(user.skills);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.addLink = async (req, res) => {
  try {
    const userId = req.user._id;
    const content = req.body;
    const { field, link } = content;
    if (!field || !link) {
      return res
        .status(400)
        .json({ error: "either the field or, the link is empty" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const linkInfo = {
      field: field || "",
      link: link || "",
    };

    user.links.push(linkInfo);

    await user.save();

    res.status(200).json(user.links);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.fetchLinks = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    return res.json(user.links);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
exports.uploadResume = async (req, res) => {
  try {
    console.log("here");
    // if (!req.files["resume"]) {
    //   return res.status(400).json({ error: "No file found" });
    // }
    // console.log(typeof req.file);
    // const { originalname, path: filePath, mimetype, size } = req.file;

    // console.log("filename: = " + originalname);
    // console.log("filepath: = " + filePath);
    // console.log("filetype: = " + mimetype);

    const userId = req.user._id;
    const user = await User.findById(userId);
    // if (!user) {
    //   return res.status(400).json({ error: "User not found" });
    // }

    // const newResume = {
    //   fileName: originalname,
    //   filePath: filePath,
    //   fileType: mimetype,
    //   fileSize: fileSizeFormatter(size, 2),
    // };

    user.resume = await uploadToS3(req.files["resume"][0]);
    await user.save();

    res.json(user.resume);
    // res.json("success");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.fetchResume = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    return res.json(await getFile(user.resume));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const fileSizeFormatter = (bytes, decimal) => {
  if (bytes === 0) {
    return "0 Bytes";
  }
  const dm = decimal || 2;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "YB", "ZB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1000));
  return (
    parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + " " + sizes[index]
  );
};
