const express = require("express");
const { createQuiz, getAllQuiz, getSingleQuiz } = require("../controllers/quizController");
const { createQuestion } = require("../controllers/questionController");
const router = express.Router();
const authenticateUser = require("../middleware/authMiddleware");

router
  .route("/")
  .post(authenticateUser, createQuiz)
  .get(authenticateUser, getAllQuiz);

router.route("/:quizId").get(authenticateUser, getSingleQuiz)

module.exports = router;
