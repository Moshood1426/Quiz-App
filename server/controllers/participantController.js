const {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} = require("../errors");
const { StatusCodes } = require("http-status-codes");
const Quiz = require("../models/Quiz");
const Participant = require("../models/Participant");
const { attachCookiesToRes } = require("../utils/jwt");
const validator = require("validator");

const createParticipant = async (req, res) => {
  const { identifier } = req.body;
  const { quizId } = req.params;

  if (!identifier) {
    throw new BadRequestError("An identifier should be added");
  }

  const quiz = await Quiz.findOne({ _id: quizId });

  if (!quiz) {
    throw new NotFoundError("quiz with id not found");
  }

  await Participant.create({ identifier, quizId });

  res.status(StatusCodes.CREATED).json({ msg: "Created" });
};

const validateParticipant = async (req, res) => {
  const { quizId, privacy, identifier, firstName, lastName } = req.query;

  if (!quizId || !privacy) {
    throw new BadRequestError(`Quiz with ${quizId} not found`);
  }

  if (privacy === "true") {
    const participant = await Participant.findOne({
      quizId,
      identifier,
    });

    if (!participant) {
      throw new UnauthenticatedError(
        "Participant is not registered to take this course"
      );
    }
  }

  if (privacy === "false") {
    const identifierIsEmail = validator.isEmail(identifier);
    if (!identifierIsEmail) {
      throw new BadRequestError("Please provide a valid email");
    }
    const participant = await Participant.create({
      identifier,
      firstName,
      lastName,
    });
  }

  const userObj = { participantId: participant._id, quizId: quiz._id };
  attachCookiesToRes({ res, user: userObj });
};

module.exports = { createParticipant, validateParticipant };
