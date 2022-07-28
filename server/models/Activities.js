const mongoose = require("mongoose");

const ActivitiesSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: [true, "an action should be provided"],
    },
    for: {
      type: mongoose.Types.ObjectId,
      ref: "quiz",
      required: [true, "Please provide a quiz"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "please provide a user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("activities", ActivitiesSchema)