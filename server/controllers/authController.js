const {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} = require("../errors");
const { attachCookiesToRes, verifyJWT } = require("../utils/jwt");
const User = require("../models/User");
const sendForgotPasswordEmail = require("../utils/ForgotPasswordEmail");
const { StatusCodes } = require("http-status-codes");

const register = async (req, res) => {
  const { email, password, firstName, lastName, name } = req.body;

  if (!email || !password || !firstName || !lastName) {
    throw new BadRequestError("please input necessary details");
  }

  const userExists = await User.findOne({ email: email });
  if (userExists) {
    throw new BadRequestError("User with email already exist");
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
  });

  const userObj = { id: user._id, email, firstName, lastName };
  attachCookiesToRes({ res: res, user: userObj });

  res.status(StatusCodes.CREATED).json({ user: userObj });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Kindly input an email address");
  }

  const user = await User.findOne({ email: email });
  if (!user) {
    throw new NotFoundError("User with email not registered");
  }

  const passwordMatch = await user.comparePassword(password);

  if (!passwordMatch) {
    throw new UnauthenticatedError("Invalid credentials");
  }

  const userObj = {
    id: user._id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  };

  attachCookiesToRes({ res, user: userObj });
  res.status(StatusCodes.CREATED).json({ user: userObj });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new BadRequestError("Kindly input an email address");
  }

  const user = await User.findOne({ email: email });
  if (!user) {
    throw new NotFoundError("Kindly check your email for next step");
  }

  const userObj = { email: user.email, firstName: user.firstName };
  console.log(email);
  await sendForgotPasswordEmail({
    to: user.email,
    origin: "http://localhost:3000",
    userObj,
  });

  res
    .status(StatusCodes.OK)
    .json({ msg: "Kindly check your email for next step" });
};

const resetPassword = async (req, res) => {
  const { token, email } = req.query;
  const { newPassword, confirmNewPass } = req.body;

  if (newPassword !== confirmNewPass) {
    throw new BadRequestError("Kindly ensure both inputs matches");
  }

  const result = verifyJWT(token);
  if (!result) {
    throw new UnauthenticatedError("Something went wrong, try again later");
  }

  if (result.email !== email) {
    throw new UnauthenticatedError("Something went wrong, try again later");
  }

  const user = await User.findOne({ email: result.email });
  if (!user) {
    throw new NotFoundError("Something went wrong, try again later");
  }

  user.password = newPassword;
  await user.save();

  res.status(StatusCodes.CREATED).json({
    msg: "Password successfully changed. Proceed to login with new pass",
  });
};

const changeProfileDetails = async (req, res) => {
  const { firstName, lastName, email } = req.body;

  if (!firstName || !lastName || !email) {
    throw new BadRequestError("Kindly input all necessary details");
  }

  const oldUser = await User.findOne({ _id: req.user.userId });

  if (!oldUser) {
    throw new NotFoundError("User not found");
  }

  oldUser.email = email;
  oldUser.firstName = firstName;
  oldUser.lastName = lastName;

  await oldUser.save();

  const userObj = { id: oldUser._id, email, firstName, lastName };
  attachCookiesToRes({ res: res, user: userObj });

  res.status(StatusCodes.CREATED).json({ user: userObj });
};

const updatePassword = async (req, res) => {
  const { newPassword, confirmNewPassword } = req.body;

  if (!newPassword || !confirmNewPassword) {
    throw new BadRequestError("Kindly input all essential details");
  }

  if (newPassword !== confirmNewPassword) {
    throw new BadRequestError("Passwords does not match");
  }

  const user = await User.findOne({ _id: req.user.userId });
  if (!user) {
    throw new NotFoundError("Something went wrong, try again later");
  }

  user.password = newPassword;
  await user.save();

  res.status(StatusCodes.CREATED).json({
    msg: "password successfully changed",
  });
};

const deleteAccount = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });

  if (!user) {
    throw new NotFoundError(`No user with id : ${req.user.userId}`);
  }

  await user.remove();
  res.status(StatusCodes.OK).json({ msg: "user profile deleted." });
};

const logout = (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now() + 1000),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};

module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword,
  changeProfileDetails,
  updatePassword,
  deleteAccount,
  logout,
};
