const { BadRequestError, NotFoundError } = require("../errors");
const Quiz = require("../models/Quiz");
const Participant = require("../models/Participant");
const Question = require("../models/Questions");
const { StatusCodes } = require("http-status-codes");
const Questions = require("../models/Questions");

const createQuiz = async (req, res) => {
  const { quizCode, quizTitle, quizType } = req.body;

  if (!quizCode || !quizTitle || !quizType) {
    throw new BadRequestError("Please input all essentail quiz details");
  }
  const createdBy = req.user.userId;

  const quiz = await Quiz.create({ ...req.body, createdBy: createdBy });

  res.status(StatusCodes.CREATED).json({ msg: "quiz created", quiz });
};

const getAllQuiz = async (req, res) => {
  const { title, sort, code, type, privacy, forSubmission } = req.query;
  const queryObj = {
    createdBy: req.user.userId,
  };

  //get all quiz that has submissions
  if (forSubmission === "true") {
    const quiz = await Quiz.find({
      ...queryObj,
      noOfSubmissions: { $gte: 1 },
    }).select("_id quizTitle quizCode startDate endDate noOfSubmissions");
    res.status(StatusCodes.OK).json({ quiz });
    return;
  }

  //apply filter options
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

  //await quiz result
  const quiz = await result;

  res.status(StatusCodes.OK).json({ numOfQuiz: quiz.length, quiz });
};

const getSingleQuiz = async (req, res) => {
  const { quizCode } = req.query;
  const { quizId } = req.params;

  if (quizCode) {
    const quiz = await Quiz.findOne({ quizCode: quizCode });
    if (!quiz) {
      throw new NotFoundError("Quiz cannot be found");
    }
    res.status(StatusCodes.OK).json({ quiz });
  }

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

  await quiz.remove();
  res.status(StatusCodes.OK).json({ msg: "Quiz deleted succesfully" });
};

const editQuiz = async (req, res) => {
  const { quizCode, quizTitle, privacy } = req.body;
  const { quizId } = req.params;

  if (!quizCode || !quizTitle || !privacy) {
    throw new BadRequestError("Please input all essentail quiz details");
  }
  const createdBy = req.user.userId;

  const quiz = await Quiz.findOne({ _id: quizId, createdBy: createdBy });

  if (!quiz) {
    throw new NotFoundError("Something went wrong");
  }

  quiz.quizCode = quizCode;
  quiz.quizTitle = quizTitle;
  quiz.privacy = privacy === "private" ? true : false;
  await quiz.save();

  res.status(StatusCodes.OK).json({ msg: "Quiz details updated successfully" });
};

const publishQuiz = async (req, res) => {
  const { anytime, startDate, endDate } = req.body;
  const { quizId } = req.params;

  console.log(req.body);
  if (!anytime) {
    if (!startDate && !endDate) {
      throw new BadRequestError(
        "One of start date or end date should be provided"
      );
    }
  }

  const quiz = await Quiz.findOne({ _id: quizId });
  if (!quiz) {
    throw new NotFoundError("quiz not found");
  }

  if (anytime) {
    quiz.published = true;
    quiz.startDate = "";
    quiz.endDate = "";
    await quiz.save();
  } else {
    startDate && (quiz.startDate = startDate);
    endDate && (quiz.endDate = endDate);
    quiz.published = true;
    await quiz.save();
  }

  res.status(StatusCodes.CREATED).json({ msg: "Quiz succesfully published" });
};

module.exports = {
  createQuiz,
  getAllQuiz,
  getSingleQuiz,
  deleteSingleQuiz,
  editQuiz,
  publishQuiz,
};
