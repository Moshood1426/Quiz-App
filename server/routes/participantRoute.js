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
  submitParticipantAnswers,
} = require("../controllers/participantController");
const { getSingleQuiz } = require("../controllers/quizController");

router.route("/").post(validateParticipant).get(getSingleQuiz);
router
  .route("/take-test")
  .get(authenticateParticipant, getParticipantQuestions)
  .post(authenticateParticipant, addParticipantAnswers)
  .patch(authenticateParticipant, submitParticipantAnswers);
router.route("/:quizId").post(authenticateUser, createParticipant);

module.exports = router;
