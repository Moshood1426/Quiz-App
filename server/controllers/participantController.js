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
const Questions = require("../models/Questions");
const checkPermissions = require("../utils/checkPermissions");
const moment = require("moment");

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

const getAllParticipant = async (req, res) => {
  const { quizId } = req.params;

  if (!quizId) {
    throw new BadRequestError("Kindly input a valid quizId");
  }

  const participant = await Participant.find({ quizId }).select("-answers");
  if (!participant) {
    throw new NotFoundError("Kindly input a valid quizId");
  }

  res
    .status(StatusCodes.OK)
    .json({ totalQuestions: participant.length, participant });
};

const deleteParticipant = async (req, res) => {
  const { participantId } = req.query;

  const participant = await Participant.findOne({ _id: participantId });
  if (!participant) {
    throw new NotFoundError("Invalid participant selected");
  }
  const quiz = await Quiz.findOne({ _id: participant.quizId });

  checkPermissions(req.user, quiz.createdBy);
  await participant.remove();

  res.status(StatusCodes.OK).json({ msg: "Participant deleted succesfully" });
};

const getParticipantQuiz = async (req, res) => {
  const { quizCode } = req.query;

  if (!quizCode) {
    throw new BadRequestError("Quiz code should be provided");
  }

  const quiz = await Quiz.findOne({ quizCode: quizCode }).select(
    "-__v -createdAt -createdBy -noOfSubmissions -updatedAt"
  );

  if (!quiz) {
    throw new NotFoundError("Quiz cannot be found");
  }

  if (!quiz.published) {
    throw new BadRequestError("Quiz not available at this moment");
  }

  const startDate = quiz.startDate ? moment(quiz.startDate).format() : "";
  const endDate = quiz.endDate ? moment(quiz.endDate).format() : "";
  const currentDate = moment().format();

  if (endDate && currentDate > endDate) {
    throw new BadRequestError(
      `Quiz was scheduled to end at ${moment(endDate).format("lll")}`
    );
  }

  if (startDate && currentDate < startDate) {
    throw new BadRequestError(
      `Quiz was scheduled for ${moment(startDate).format("lll")}`
    );
  }

  res.status(StatusCodes.OK).json({ quiz });
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

    if (participant.submitted) {
      throw new BadRequestError("Your submission for this test was received");
    }
  }

  if (privacy === false) {
    if (!identifier || !firstName || !lastName) {
      throw new BadRequestError("Please input all necessary details");
    }
    const user = await Participant.findOne({ identifier });
    if (user.submitted) {
      throw new BadRequestError("Your submission for this test was received");
    }
    if (user) {
      participant = user;
    } else {
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
  }

  const userObj = { participantId: participant._id, quizId: quizId };
  attachCookiesToRes({ res, user: userObj });

  res.status(StatusCodes.OK).json({ user: userObj });
};

const getParticipantQuestions = async (req, res) => {
  const { quizId, participantId } = req.participant;

  const participant = await Participant.findOne({
    _id: participantId,
    quizId: quizId,
  });
  //getting participant details
  if (!participant) {
    throw new UnauthenticatedError("User not allowed to take this test");
  }
  if (participant.submitted) {
    throw new BadRequestError("Your submission for this test was received");
  }

  //getting quiz test
  const quiz = await Quiz.findOne({ _id: quizId });
  if (!quiz) {
    throw new NotFoundError("quiz cannot be found");
  }

  //validating date of test
  const startDate = quiz.startDate ? moment(quiz.startDate).format() : "";
  const endDate = quiz.endDate ? moment(quiz.endDate).format() : "";
  const currentDate = moment().format();

  if (endDate && currentDate > endDate) {
    throw new BadRequestError(
      `Quiz was scheduled to end at ${moment(endDate).format("lll")}`
    );
  }
  if (startDate && currentDate < startDate) {
    throw new BadRequestError(
      `Quiz was scheduled for ${moment(startDate).format("lll")}`
    );
  }

  let result = Questions.find({ forQuiz: quiz._id }).select("-correctAnswer");

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);
  const questions = await result;

  const totalQuestions = await Questions.countDocuments({ forQuiz: quizId });
  if (!questions) {
    throw new NotFoundError("questions not allocated to this quiz");
  }

  res.status(StatusCodes.OK).json({
    totalQuestions,
    quiz,
    questions,
    participant,
    questionsAnswered: participant.answers.length,
  });
};

const addParticipantAnswers = async (req, res) => {
  const { answers } = req.body;
  const { participantId } = req.participant;
  //stil check if participant submitted && if time is not elapsed
  if (!answers.questionId || !answers.answer) {
    throw new NotFoundError("Answer cannot be empty");
  }

  const participant = await Participant.findOne({ _id: participantId });
  if (!participant) {
    throw new UnauthenticatedError("Kindly provide valid participant");
  }
  const data = participant.answers;
  const answerExist = data.find(
    (item) => item.questionId.toString() === answers.questionId
  );

  if (answerExist) {
    const result = data.map((item) => {
      if (item.questionId.toString() === answerExist.questionId.toString()) {
        return { ...answers };
      } else {
        return { ...item };
      }
    });
    participant.answers = [...result];
    await participant.save();
  } else {
    const quiz = await Questions.findOne({ _id: answers.questionId });
    if (!quiz) throw new BadRequestError("Answer cannot be added");
    participant.answers = [...participant.answers, answers];
    await participant.save();
  }

  res
    .status(StatusCodes.OK)
    .json({ msg: "Successful", questionsAnswered: participant.answers.length });
};

const submitParticipantAnswers = async (req, res) => {
  const { participantId, quizId } = req.participant;

  const participant = await Participant.findOne({ _id: participantId, quizId });
  if (!participant) {
    throw new NotFoundError("participant cannot be found");
  }

  const quiz = await Quiz.findOne({ _id: quizId });

  participant.submitted = true;
  await participant.save();
  quiz.noOfSubmissions = quiz.noOfSubmissions + 1;
  await quiz.save();

  res.status(StatusCodes.OK).json({ msg: "Submission succesful" });
};

const checkResults = async (req, res) => {
  const { quizCode, identifier } = req.body;

  //find the test if it exists
  const quiz = await Quiz.findOne({ quizCode: quizCode }).select(
    "_id quizTitle quizCode startDate endDate noOfSubmissions releaseResults"
  );
  if (!quiz) {
    throw new NotFoundError("quiz cannot be found");
  }

  //find the participant if it exists
  const participant = await Participant.findOne({
    identifier: identifier,
    quizId: quiz._id,
  });
  if (!participant) {
    throw new UnauthenticatedError("Participant not registered for this test");
  }
  if (!participant.submitted) {
    throw new BadRequestError("Participant has not taken this test");
  }

  //check if test results was released
  if (!quiz.releaseResults) {
    throw new BadRequestError("Results unavailable at this moment");
  }

  //find quiz questions
  const questions = await Questions.find({ forQuiz: quiz._id });

  res.status(StatusCodes.OK).json({ participant, quiz, questions });
};

module.exports = {
  createParticipant,
  validateParticipant,
  getAllParticipant,
  deleteParticipant,
  getParticipantQuestions,
  addParticipantAnswers,
  submitParticipantAnswers,
  getParticipantQuiz,
  checkResults,
};
