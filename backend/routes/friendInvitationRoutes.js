const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const friendInvitationControllers = require("../controllers/friendInvitation/friendInvitationControllers");
const postReject = require("../controllers/friendInvitation/postReject");
const postFriendInvitationSchema = Joi.object({
  targetMailAddress: Joi.string().email(),
});

const inviteDecisionSchema = Joi.object({
  id: Joi.string().required(),
});

router
  // .route("/invite")
  .post(
    "/invite",
    isAuthenticatedUser,
    validator.body(postFriendInvitationSchema),
    friendInvitationControllers.controllers.postInvite
  );

router.post(
  "/accept",
  isAuthenticatedUser,
  validator.body(inviteDecisionSchema),
  friendInvitationControllers.controllers.postAccept
);

router.post(
  "/reject",
  isAuthenticatedUser,
  validator.body(inviteDecisionSchema),
  friendInvitationControllers.controllers.postReject
);

module.exports = router;
