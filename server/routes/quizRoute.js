const express = require("express");
const {
  createQuiz,
  getAllQuiz,
  deleteSingleQuiz,
  getSingleQuiz,
  editQuiz,
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
  .delete(authenticateUser, deleteSingleQuiz)
  .patch(authenticateUser, editQuiz)

module.exports = router;
