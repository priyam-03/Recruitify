const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const { addGroup, getGroup } = require("../controllers/groupController");
router.route("/addGroup").post(isAuthenticatedUser, addGroup);
router.route("/getGroup").get(isAuthenticatedUser, getGroup);
module.exports = router;
