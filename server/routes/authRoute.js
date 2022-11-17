const express = require("express");

const router = express.Router();
const {
  register,
  login,
  forgotPassword,
  resetPassword,
  changeProfileDetails,
  updatePassword,
  deleteAccount,
  logout
} = require("../controllers/authController");
const { authenticateUser } = require("../middleware/authMiddleware");

const rateLimiter = require("express-rate-limit");

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 mins,
  max: 10,
  message:
    "Too many requests from this IP address, please try again after 15 minutes",
});

router.route("/register").post(apiLimiter, register);
router.route("/login").post(apiLimiter, login);
router.route("/forgot-password").post(apiLimiter, forgotPassword);
router.route("/reset-password").post(apiLimiter, resetPassword);
router.route("/updateUser").patch(authenticateUser, changeProfileDetails);
router.route("/updatePassword").patch(authenticateUser, updatePassword);
router.route("/deleteAccount").delete(authenticateUser, deleteAccount);
router.route("/logout").get(authenticateUser, logout);

module.exports = router;
