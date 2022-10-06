const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Types.ObjectId,
    ref: "question",
    required: [true, "Kindly enter answer for valid Question"],
  },
  answer: {
    type: String,
    required: [true, "Kindly enter an answer"],
  },
});

const ParticipantSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    required: true,
    minlength: [3, "Name cannot be less than 3 characters"],
    maxlength: [20, "Name cannot be more than 3 characters"],
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
    minlength: [3, "Name cannot be less than 3 characters"],
    maxlength: [20, "Name cannot be more than 3 characters"],
  },
  identifier: {
    type: String,
    required: [true, "identifier should be provided"],
    minLength: [5, "Identifier should not be less than 5 chars"],
  },
  answers: [answerSchema],
  quizId: {
    type: mongoose.Types.ObjectId,
    ref: "quiz",
    required: [true, "kindly enter quizId"],
  },
  submitted: {
    type: Boolean,
    default: false,
  },
  startedTest: {
    type: Boolean,
    default: false,
  },
});

//edit such that identifier should be unique for different quizId
ParticipantSchema.index({ quizId: 1, identifier: 1 }, { unique: true });

module.exports = mongoose.model("participant", ParticipantSchema);
