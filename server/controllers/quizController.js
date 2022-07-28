const { BadRequestError } = require("../errors");
const Quiz = require("../models/Quiz");
const Activities = require("../models/Activities");
const Question = require("../models/Questions");
const { StatusCodes } = require("http-status-codes");

const createQuiz = async (req, res) => {
  const { quizCode, quizTitle, quizType } = req.body;
  console.log(req.user.userId);
  if (!quizCode || !quizTitle || !quizType) {
    throw new BadRequestError("Please input all essentail quiz details");
  }
  const createdBy = req.user.userId;

  const quiz = await Quiz.create({ ...req.body, createdBy: createdBy });

  const activityObj = {
    action: `New quiz created titled ${quiz.quizTitle}`,
    for: quiz._id,
    createdBy: createdBy,
  };

  const activity = await Activities.create({ ...activityObj });

  res.status(StatusCodes.CREATED).json({ msg: "quiz created", quiz });
};

const getAllQuiz = async (req, res) => {
  const { title, sort, code, type, privacy } = req.query;
  const queryObj = {
    createdBy: req.user.userId,
  };

  if (title) {
    queryObj.quizTitle = { $regex: title, $options: "i" };
  }
  if (code) {
    queryObj.quizCode = { $regex: code, $options: "i" };
  }
  if (privacy && privacy !== "all") {
    let private = privacy === "private" ? true : false;
    queryObj.privacy = private;
  }
  if (type && type !== "all") {
    queryObj.quizType = type;
  }

  let result = Quiz.find({ ...queryObj });
  if (sort === "latest") {
    result = result.sort("-createdAt");
  }
  if (sort === "oldest") {
    result = result.sort("createdAt");
  }
  if (sort === "a-z") {
    result = result.sort("quizTitle");
  }
  if (sort === "z-a") {
    result = result.sort("-quizTitle");
  }

  const quiz = await result;
  const activities = await Activities.find({ createdBy: req.user.userId });

  res.status(StatusCodes.OK).json({ numOfQuiz: quiz.length, quiz, activities });
};

const getSingleQuiz = async (req, res) => {
  const { quizId } = req.params;

  if (!quizId) {
    throw new BadRequestError("Kindly input a valid quizId");
  }

  const quiz = await Quiz.findOne({ _id: quizId });
  if (!quiz) {
    throw new NotFoundError("Kindly input a valid quizId");
  }

  res.status(StatusCodes.OK).json({ quiz });
};

const deleteSingleQuiz = async (req, res) => {
  const { quizId } = req.params;

  if (!quizId) {
    throw new BadRequestError("Kindly input a valid quizId");
  }

  const quiz = await Quiz.findOne({ _id: quizId });
  if (!quiz) {
    throw new NotFoundError("Kindly input a valid quizId");
  }

  await quiz.remove()
  res.status(StatusCodes.OK).json({ msg: "Quiz deleted succesfully" });
};

const editQuiz = async(req, res) => {
  
}

module.exports = { createQuiz, getAllQuiz, getSingleQuiz, deleteSingleQuiz };
