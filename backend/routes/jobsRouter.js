const express = require("express");
const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/auth");
const {
  createJobForms,
  applyForJob,
  fetchMyJobForms,
  fetchJobById,
  fetchAllJobForms,
  shortlist,
  viewSimilarJobs,
} = require("../controllers/jobController");

router.route("/createJobForm").post(isAuthenticatedUser, createJobForms);
router.route("/fetchMyJobForms").get(isAuthenticatedUser, fetchMyJobForms);
router.route("/fetchAllJobForms").get(isAuthenticatedUser, fetchAllJobForms);
router.route("/fetchJobById/:id").get(isAuthenticatedUser, fetchJobById);
router.route("/applyForJob").put(isAuthenticatedUser, applyForJob);
router.route("/shortlist").get(isAuthenticatedUser, shortlist);
router.route("/viewSimilarJobs").post(isAuthenticatedUser, viewSimilarJobs);
module.exports = router;
