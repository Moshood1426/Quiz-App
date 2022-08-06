const express = require("express");
const router = express.Router();
const authenticateUser = require("../middleware/authMiddleware");
const { createParticipant,validateParticipant } = require("../controllers/participantController")

router.route("/").post(validateParticipant)
router.route("/:quizId").post(authenticateUser, createParticipant)

module.exports = router;
