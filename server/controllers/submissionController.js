//const participants = Participant.find({quizId: quiz, submitted: true})

const Participant = require("../models/Participant");
const Questions = require("../models/Questions");
const Quiz = require("../models/Quiz");
const { StatusCodes } = require("http-status-codes");

const getAllSubmissions = async (req, res) => {
  const { quizId } = req.params;

  let participant = await Participant.find({
    quizId: quizId,
    submitted: true,
  });

  const questions = await Questions.find({ forQuiz: quizId });
  res.status(StatusCodes.OK).json({ participant, questions });
};

const getSingleSubmission = async (req, res) => {
  const { quizId } = req.params;

  const questions = await Questions.find({ _id: quizId });
  const participant = await Participant.findOne({ _id: participantId });
};

const releaseResult = async (req, res) => {
  const { quizId } = req.params;
  const { withdraw } = req.query;

  if (!quizId) {
    throw new BadRequestError("quiz id cannot be empty");
  }

  const quiz = await Quiz.findOne({ _id: quizId });
  if (!quiz) {
    throw new NotFoundError("quiz cannot be found");
  }

  if (withdraw) {
    quiz.releaseResults = false;
  } else {
    quiz.releaseResults = true;
  }
  await quiz.save();

  res
    .status(StatusCodes.OK)
    .json({ msg: "Quiz result can now be accessed by participant" });
};

module.exports = { getAllSubmissions, releaseResult };
