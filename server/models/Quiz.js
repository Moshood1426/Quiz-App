const mongoose = require("mongoose");
const validator = require("validator");

const TestParticipantsSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter an email"],
    validate: {
      validator: validator.isEmail,
      message: "Please enter a valid email address",
    },
  },
  startedTest: {
    type: Boolean,
    default: false,
  },
  submitted: {
    type: Boolean,
    default: false,
  },
});

const QuizSchema = new mongoose.Schema(
  {
    quizTitle: {
      type: String,
      required: true,
      trim: true,
      minLength: [3, "quiz title should not be less than 3 characters"],
      maxLength: [30, "quiz title should not be more than 30 characters"],
    },
    quizCode: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
      minLength: [5, "quiz code should not be less than 5 characters"],
      maxLength: [20, "quiz code should not be more than 20 characters"],
    },
    quizType: {
      type: String,
      enum: ["quick", "moderated"],
      required: true,
    },
    startDate: {
      type: Date,
    },
    noOfQuestions: {
      type: Number,
      default: 0,
    },
    privacy: {
      type: Boolean,
      default: true,
    },
    noOfSubmissions: {
      type: Number,
      default: 0,
    },
    allowNonParticipants: {
      type: Boolean,
      default: false,
    },
    participants: [TestParticipantsSchema],
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "please provide a user"],
    },
  },
  { timestamps: true }
);

QuizSchema.index({ quizCode: 1 }, { unique: true });

QuizSchema.pre("remove", async function () {
  await this.model("question").deleteMany({ forQuiz: this._id });
  await this.model("activities").deleteMany({ for: this._id });
});

module.exports = mongoose.model("quiz", QuizSchema);
