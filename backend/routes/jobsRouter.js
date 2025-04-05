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
  handlePdfUpload,
  chatWithAi,
} = require("../controllers/jobController");
const { upload } = require("../utils/filehelper");

router.route("/createJobForm").post(isAuthenticatedUser, createJobForms);
router.route("/fetchMyJobForms").get(isAuthenticatedUser, fetchMyJobForms);
router.route("/fetchAllJobForms").get(isAuthenticatedUser, fetchAllJobForms);
router.route("/fetchJobById/:id").get(isAuthenticatedUser, fetchJobById);
router.route("/applyForJob").put(isAuthenticatedUser, applyForJob);
router.route("/shortlist").get(isAuthenticatedUser, shortlist);
router.route("/viewSimilarJobs").post(isAuthenticatedUser, viewSimilarJobs);
router
  .route("/CreateByAi/upload")
  .post(isAuthenticatedUser, upload.array("pdf", 10), handlePdfUpload);
router.route("/CreateByAi/chat").post(isAuthenticatedUser, chatWithAi);
module.exports = router;
