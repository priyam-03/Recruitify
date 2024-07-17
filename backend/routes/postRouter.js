const express = require("express");
const router = express.Router();

const {createPost, getPost, deletePost} = require("../controllers/postController");
const { isAuthenticatedUser} = require("../middleware/auth");

router.route("/createpost").post(isAuthenticatedUser,createPost);
router.route("/getposts/:email").get(isAuthenticatedUser,getPost);
router.route("/deletepost:id").delete(isAuthenticatedUser,deletePost);
// router.route("/savepost").post(isAuthenticatedUser,)
// router.route("/editpost").post(isAuthenticatedUser)

module.exports = router;