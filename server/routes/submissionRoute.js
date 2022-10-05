const express = require("express");
const router = express.Router();
const {
  getAllSubmissions,
  releaseResult,
} = require("../controllers/submissionController");
const { authenticateUser } = require("../middleware/authMiddleware");

router
  .route("/:quizId")
  .get(authenticateUser, getAllSubmissions)
  .patch(authenticateUser, releaseResult);

module.exports = router;
