const mongoose = require("mongoose");

const QuestionsSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["true-false", "multiple-choice", "fill-in-gap"],
      required: [true, "Kindly select preferred question type"],
    },
    question: {
      type: String,
      required: [true, "Kindly enter a question"],
    },
    options: {
      type: [String],
      required: [true, "Kindly enter the options array"],
      validate: {
        validator: function arrayLimit(val) {
          return val.length > 0 && val.length < 5 && val.every((item) => item !== "");
        },
        message: "Options should not be empty",
      },
    },
    correctAnswer: {
      type: String,
      required: [true, "Kindly provide the answer"],
    },
    points: {
      type: Number,
      default: 1,
    },
    forQuiz: {
      type: mongoose.Types.ObjectId,
      ref: "quiz",
      required: [true, "Kindly enter a quiz-id"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "please provide a user"],
    },
  },
  { timestamps: true }
);

QuestionsSchema.pre("remove", async function () {
  /* await this.model("quiz").updateOne({ forQuiz: this._id }); */
});

module.exports = mongoose.model("question", QuestionsSchema);
 