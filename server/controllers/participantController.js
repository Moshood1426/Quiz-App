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
  const { identifier, firstName, lastName } = req.body;
  const { quizId } = req.params;

  if (!identifier || !firstName || !lastName) {
    throw new BadRequestError("An identifier should be added");
  }

  const quiz = await Quiz.findOne({ _id: quizId });

  if (!quiz) {
    throw new NotFoundError("quiz with id not found");
  }

  await Participant.create({ identifier, quizId, firstName, lastName });

  res.status(StatusCodes.CREATED).json({ msg: "Created" });
};

const validateParticipant = async (req, res) => {
  const { quizId, privacy, identifier, firstName, lastName } = req.body;

  if (!quizId || typeof privacy !== "boolean") {
    throw new BadRequestError(`Quiz ID and privacy should to be provided`);
  }

  let participant;
  if (privacy === true) {
    participant = await Participant.findOne({
      quizId,
      identifier,
    });

    if (!participant) {
      throw new UnauthenticatedError(
        "Participant is not registered to take this course"
      );
    }
  }

  if (privacy === false) {
    if (!identifier || !firstName || !lastName) {
      throw new BadRequestError("Please input all necessary details");
    }
    const identifierIsEmail = validator.isEmail(identifier);
    if (!identifierIsEmail) {
      throw new BadRequestError("Please provide a valid email");
    }
    participant = await Participant.create({
      identifier,
      firstName,
      lastName,
      quizId,
    });
  }

  const userObj = { participantId: participant._id, quizId: quizId };
  attachCookiesToRes({ res, user: userObj });

  res.status(StatusCodes.OK).json({ user: userObj });
};

module.exports = { createParticipant, validateParticipant };
