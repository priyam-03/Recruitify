const express = require("express");
const { isAuthenticatedUser } = require("../middleware/auth");
const { addEducation, addExperience, addSkill, addLink, fetchEducations, fetchExperiences, fetchLinks, fetchSkills } = require("../controllers/profileController");
const router = express.Router();


module.exports = router;

router.route("/addEducation").post(isAuthenticatedUser,addEducation);
router.route("/addExperience").post(isAuthenticatedUser,addExperience);
router.route("/addSkill").post(isAuthenticatedUser,addSkill);
router.route("/addLink").post(isAuthenticatedUser,addLink);
router.route("/fetchEducations").get(isAuthenticatedUser,fetchEducations);
router.route("/fetchExperiences").get(isAuthenticatedUser,fetchExperiences);
router.route("/fetchSkills").get(isAuthenticatedUser,fetchSkills);
router.route("/fetchLinks").get(isAuthenticatedUser,fetchLinks);
