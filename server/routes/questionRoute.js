const express = require("express");
const router = express.Router();
const { createQuestion, getQuizQuestions } = require("../controllers/questionController");
const authenticateUser = require("../middleware/authMiddleware");

router.route("/").post(authenticateUser, createQuestion);
router.route("/:quizId").get(authenticateUser, getQuizQuestions);

module.exports = router;
