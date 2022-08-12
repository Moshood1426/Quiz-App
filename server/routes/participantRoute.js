const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authenticateParticipant,
} = require("../middleware/authMiddleware");
const {
  createParticipant,
  validateParticipant,
  getParticipantQuestions,
  addParticipantAnswers,
} = require("../controllers/participantController");

router.route("/").post(validateParticipant);
router
  .route("/take-test")
  .get(authenticateParticipant, getParticipantQuestions)
  .post(authenticateParticipant, addParticipantAnswers);
router.route("/:quizId").post(authenticateUser, createParticipant);

module.exports = router;
