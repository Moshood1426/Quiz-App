const express = require("express");

const router = express.Router();
const { register, login, forgotPassword, changePassword} = require("../controllers/authController")

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/forgot-password").post(forgotPassword)

module.exports = router

