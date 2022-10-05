const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authenticateParticipant,
} = require("../middleware/authMiddleware");
const {
  deleteParticipant,
  createParticipant,
  validateParticipant,
  getParticipantQuestions,
  addParticipantAnswers,
  submitParticipantAnswers,
  getAllParticipant,
  getParticipantQuiz,
  checkResults,
} = require("../controllers/participantController");

router.route("/").post(validateParticipant).get(getParticipantQuiz);

router
  .route("/take-test")
  .get(authenticateParticipant, getParticipantQuestions)
  .post(authenticateParticipant, addParticipantAnswers)
  .patch(authenticateParticipant, submitParticipantAnswers);

router.route("/check-results").post(checkResults);

router
  .route("/:quizId")
  .post(authenticateUser, createParticipant)
  .get(authenticateUser, getAllParticipant)
  .delete(authenticateUser, deleteParticipant);

module.exports = router;
