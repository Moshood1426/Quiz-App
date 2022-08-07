const express = require("express");
const {
  createQuiz,
  getAllQuiz,
  deleteSingleQuiz,
  getSingleQuiz,
  editQuiz,
  publishQuiz,
} = require("../controllers/quizController");
const router = express.Router();
const { authenticateUser } = require("../middleware/authMiddleware");

router
  .route("/")
  .post(authenticateUser, createQuiz)
  .get(authenticateUser, getAllQuiz);

router.route("/publish/:quizId").patch(authenticateUser, publishQuiz);

router
  .route("/:quizId")
  .get(authenticateUser, getSingleQuiz)
  .delete(authenticateUser, deleteSingleQuiz)
  .patch(authenticateUser, editQuiz);

module.exports = router;
