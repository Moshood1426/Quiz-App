//const participants = Participant.find({quizId: quiz, submitted: true})

const Participant = require("../models/Participant");
const Questions = require("../models/Questions");
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

module.exports = { getAllSubmissions };
