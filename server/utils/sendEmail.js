const nodemailer = require("nodemailer")
const nodemailerConfig = require("./nodemailerconfig")

const sendEmail = async ({to, subject, html}) => {
    let testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport(nodemailerConfig);

    return transporter.sendMail({
        from: '"Moshood Abdullahi 👻" <moshood.yemi10@gmail.com>', // sender address
        to,
        subject,
        html
    })
}

module.exports = sendEmail