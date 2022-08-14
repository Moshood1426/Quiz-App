const express = require("express");
const router = express.Router();
const { getAllSubmissions } = require("../controllers/submissionController")
const { authenticateUser } = require("../middleware/authMiddleware");

router.route("/:quizId").get(authenticateUser ,getAllSubmissions)

module.exports = router
