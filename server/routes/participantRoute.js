const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authenticateParticipant,
} = require("../middleware/authMiddleware");
const {
  createParticipant,
  validateParticipant,
  getParticipantQuestions
} = require("../controllers/participantController");

router.route("/").post(validateParticipant);
router.route("/:quizId").post(authenticateUser, createParticipant)
router.route("/take-test").get(authenticateParticipant, getParticipantQuestions)

module.exports = router;
 