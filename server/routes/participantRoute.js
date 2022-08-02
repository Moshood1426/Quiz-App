const express = require("express");
const router = express.Router();
const authenticateUser = require("../middleware/authMiddleware");
const { createParticipant } = require("../controllers/participantController")

router.route("/:quizId").post(authenticateUser, createParticipant)

module.exports = router;