const express = require("express");
const router = express.Router();
const {
  createQuestion,
  getQuizQuestions,
  editQuestion,
} = require("../controllers/questionController");
const authenticateUser = require("../middleware/authMiddleware");

router.route("/").post(authenticateUser, createQuestion);
router
  .route("/:quizId")
  .get(authenticateUser, getQuizQuestions)
  .patch(authenticateUser, editQuestion);

module.exports = router;
