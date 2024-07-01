const express = require("express");
const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/auth");
const { createJobForms, fetchJobForms, applyForJob } = require("../controllers/jobController");



router.route("/createJobForm").post(isAuthenticatedUser,createJobForms);
router.route("/fetchJobForms/:id").get(isAuthenticatedUser,fetchJobForms);
router.route("/applyForJob/").post(isAuthenticatedUser,applyForJob);

module.exports = router;