const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please provide a name"],
    trim: true,
    minlength: [3, "Name cannot be less than 3 characters"],
    maxlength: [20, "Name cannot be more than 3 characters"],
  },
  lastName: {
    type: String,
    required: [true, "Please provide a name"],
    trim: true,
    minlength: [3, "Name cannot be less than 3 characters"],
    maxlength: [20, "Name cannot be more than 3 characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Please enter a valid email address",
    },
  },
  password: {
    type: String,
    required: true,
    minLength: [6, "Password cannot be less than 6 characters"],
  },
});

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (passwordInput) {
  const isPassword = await bcrypt.compare(passwordInput, this.password);
  return isPassword;
};

UserSchema.pre("delete", async function () {
  await this.model("quiz").deleteMany({ createdBy: this._id });
  await this.model("question").deleteMany({ createdBy: this._id });
});

module.exports = mongoose.model("User", UserSchema);
