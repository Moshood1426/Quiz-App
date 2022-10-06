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
} = require("../controllers/authController");
const { authenticateUser } = require("../middleware/authMiddleware");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password").post(resetPassword);
router.route("/updateUser").patch(authenticateUser, changeProfileDetails);
router.route("/updatePassword").patch(authenticateUser, updatePassword);
router.route("/deleteAccount").delete(authenticateUser, deleteAccount);

module.exports = router;
