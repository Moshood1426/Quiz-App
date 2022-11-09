const { createJWT } = require("./jwt");
const sgMail = require("@sendgrid/mail");
const jwt = require("jsonwebtoken");

const sendForgotPasswordEmail = async ({ to, origin, userObj }) => {
  const twentyMins = 1000 * 60 * 10;
  const token = jwt.sign(userObj, process.env.JWT_SECRET, {
    expiresIn: twentyMins,
  });
  const link = `${origin}/reset-password?token=${token}&email=${to}`;
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: to,
    from: "abdullahi.yemi10@gmail.com",
    subject: "Reset Your Password",
    html: `<h3>Forgot your password? Kindly click <a href=${link}>here</a> to create a new password</h3>`,
  };
  const info = await sgMail.send(msg);
  return token;
};

module.exports = sendForgotPasswordEmail;
