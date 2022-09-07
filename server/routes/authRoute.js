const express = require("express");

const router = express.Router();
const {
  register,
  login,
  forgotPassword,
  changePassword,
  changeProfileDetails,
  updatePassword
} = require("../controllers/authController");
const { authenticateUser } = require("../middleware/authMiddleware");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/forgot-password").post(forgotPassword);
router.route("/updateUser").patch(authenticateUser, changeProfileDetails);
router.route("/updatePassword").patch(authenticateUser, updatePassword);

module.exports = router;
