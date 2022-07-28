const express = require("express");
const {
  createQuiz,
  getAllQuiz,
  deleteSingleQuiz,
  getSingleQuiz,
} = require("../controllers/quizController");
const router = express.Router();
const authenticateUser = require("../middleware/authMiddleware");

router
  .route("/")
  .post(authenticateUser, createQuiz)
  .get(authenticateUser, getAllQuiz);

router
  .route("/:quizId")
  .get(authenticateUser, getSingleQuiz)
  .delete(authenticateUser, deleteSingleQuiz);

module.exports = router;
