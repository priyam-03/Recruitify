const express = require("express");
const router = express.Router();

const {createPost, deletePost, getMyPost, getAllPost} = require("../controllers/postController");
const { isAuthenticatedUser} = require("../middleware/auth");

router.route("/createpost").post(isAuthenticatedUser,createPost);
router.route("/getMyPosts").get(isAuthenticatedUser,getMyPost);
router.route("/getAllPosts").get(isAuthenticatedUser,getAllPost);
router.route("/deletePost/:id").delete(isAuthenticatedUser,deletePost);
// router.route("/savepost").post(isAuthenticatedUser,)
// router.route("/editpost").post(isAuthenticatedUser)

module.exports = router;