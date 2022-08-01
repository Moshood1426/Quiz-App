const { BadRequestError, NotFoundError } = require("../errors");
const Question = require("../models/Questions");
const Quiz = require("../models/Quiz");
const { StatusCodes } = require("http-status-codes");

const createQuestion = async (req, res) => {
  const { type, question, options, correctAnswer, forQuiz } =
    req.body;

  if (
    !type ||
    !question ||
    !correctAnswer ||
    !forQuiz ||
    !options
  ) {
    throw new BadRequestError("Kindly fill required fields");
  }

  const createdBy = req.user.userId

  const setQuestion = await Question.create({ ...req.body, createdBy });
  const quiz = await Quiz.findOne({ _id: setQuestion.forQuiz });
  quiz.noOfQuestions = quiz.noOfQuestions + 1;
  await quiz.save();

  res
    .status(StatusCodes.CREATED)
    .json({ msg: "Question succesfully created", question: setQuestion });
};

const getQuizQuestions = async (req, res) => {
  const { quizId } = req.params;

  if (!quizId) {
    throw new BadRequestError("Kindly input a valid quizId");
  }

  const questions = await Question.find({ forQuiz: quizId });
  if (!questions) {
    throw new NotFoundError("Kindly input a valid quizId");
  }

  res
    .status(StatusCodes.OK)
    .json({ totalQuestions: questions.length, questions });
};

module.exports = {
  createQuestion,
  getQuizQuestions,
};
