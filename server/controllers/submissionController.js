//const participants = Participant.find({quizId: quiz, submitted: true})

const Participant = require("../models/Participant");
const Questions = require("../models/Questions");

const getAllSubmissions = async (req, res) => {
  const { quizId } = req.params;

  const participant = await Participant.find({
    quizId: quizId,
    submitted: true,
  });

  res.status(StatusCodes.OK).json({ participant });
};

const getSingleSubmission = async (req, res) => {
  const { quizId } = req.params;

  const questions = await Questions.find({ _id: quizId });
  const participant = await Participant.findOne({ _id: participantId });
};

module.exports = { getAllSubmissions };
