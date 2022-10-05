const sendEmail = require("./sendEmail")
const { createJWT }  = require("./jwt")

const sendForgotPasswordEmail = async ({to, origin, userObj}) => {
    const twentyMins = 1000 * 60 * 20;
    const token = createJWT(userObj)
    const link = `${origin}/reset-password?token=${token}&email=${to}`

    console.log("start send email")
    await sendEmail({
        to: to,
        subject: "Reset Your Password",
        html: `<h3>Forgot your password? Kindly click <a href=${link}>here</a> to reset</h3>`
    })
    console.log("send email finish")
    return token
}

module.exports = sendForgotPasswordEmail