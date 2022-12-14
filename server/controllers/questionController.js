const { BadRequestError, NotFoundError } = require("../errors");
const Question = require("../models/Questions");
const Quiz = require("../models/Quiz");
const { StatusCodes } = require("http-status-codes");
const checkPermissions = require("../utils/checkPermissions");
const axios = require("axios");
const fetch = require("node-fetch");

const createQuestion = async (req, res) => {
  //if multiple question is to be added, multipleData will be an array of the questions
  const { type, question, options, correctAnswer, forQuiz, multipleData } =
    req.body;
  const createdBy = req.user.userId;

  if (multipleData) {
    //add multiple questions to quiz schema
    let data = multipleData.map((item) => ({ ...item, createdBy, forQuiz }));
    const setQuestion = await Question.insertMany(data);

    const quiz = await Quiz.findOne({ _id: forQuiz });
    quiz.noOfQuestions = quiz.noOfQuestions + data.length;
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

  checkPermissions(req.user, questionObj.createdBy);
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
  checkPermissions(req.user, question.createdBy);
  await question.remove();

  const quiz = await Quiz.findOne({ _id: question.forQuiz });
  quiz.noOfQuestions = quiz.noOfQuestions - 1;
  await quiz.save();

  res.status(StatusCodes.OK).json({ msg: "Question deleted succesfully" });
};

const getQuickQuestions = async (req, res) => {
  const { type, difficulty, category, amount } = req.query;

  let url = `https://opentdb.com/api.php?encode=url3986&amount=${amount}`;
  if (category > 8) {
    url = url + `&category=${category}`;
  }
  if (type) {
    const result = type === "Multiple Choice" ? "multiple" : "boolean";
    url += `&type=${result}`;
  }
  if (difficulty) {
    url += `&difficulty=${difficulty}`;
  }
  console.log(url);
  const resp = await fetch(url);
  const data = await resp.json();

  res.status(StatusCodes.OK).json({ data });
};

module.exports = {
  createQuestion,
  getQuizQuestions,
  editQuestion,
  deleteQuestion,
  getQuickQuestions,
};
