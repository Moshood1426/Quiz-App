const { BadRequestError, NotFoundError } = require("../errors");
const Question = require("../models/Questions");
const Quiz = require("../models/Quiz");
const { StatusCodes } = require("http-status-codes");
const Questions = require("../models/Questions");

const createQuestion = async (req, res) => {
  //if multiple question is to be added, multipleData will be an array of the questions
  const { type, question, options, correctAnswer, forQuiz, multipleData } =
    req.body;
  const createdBy = req.user.userId;

  if (multipleData) {
    //add multiple questions to quiz schema
    let data = multipleData.map((item) => ({ ...item, createdBy, forQuiz }));
    const setQuestion = await Question.insertMany(data);

    const quiz = await Quiz.findOne({ _id: setQuestion.forQuiz });

    quiz.noOfQuestions = data.length;
    await quiz.save();

    res
      .status(StatusCodes.CREATED)
      .json({ msg: "Question succesfully created", question: setQuestion });
  }

  //add single question to quiz schema
  if (!type || !question || !correctAnswer || !forQuiz || !options) {
    throw new BadRequestError("Kindly fill required fields");
  }

  const setQuestion = await Question.create({
    type,
    question,
    options,
    correctAnswer,
    forQuiz,
    createdBy,
  });
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

const editQuestion = async (req, res) => {
  const { type, question, options, correctAnswer, points } = req.body;
  const { quizId } = req.params;

  if (!type || !question || !correctAnswer || !options || !points) {
    throw new BadRequestError("Kindly fill required fields");
  }

  const createdBy = req.user.userId;

  const questionObj = await Question.findOne({
    _id: quizId,
    createdBy,
  });

  if (!questionObj) {
    throw new NotFoundError("Invalid question edited");
  }

  questionObj.type = type;
  questionObj.question = question;
  questionObj.options = options;
  questionObj.correctAnswer = correctAnswer;
  questionObj.points = points;
  await questionObj.save();

  res.status(StatusCodes.OK).json({ msg: "Question updated succesfully" });
};

const deleteQuestion = async (req, res) => {
  const { quizId } = req.params;

  const question = await Question.findOne({ _id: quizId });
  if (!question) {
    throw new NotFoundError("Invalid question selected");
  }
  await question.remove();

  res.status(StatusCodes.OK).json({ msg: "Question deleted succesfully" });
};

module.exports = {
  createQuestion,
  getQuizQuestions,
  editQuestion,
  deleteQuestion,
};
