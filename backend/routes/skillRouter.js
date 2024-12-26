const { getSkills } = require("../controllers/skillsController");
const express = require("express");
const router = express.Router();
router.get("/", getSkills);
module.exports = router;
