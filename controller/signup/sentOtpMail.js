const User = require("../../model/user");
const AppError = require("../../utils/appError");

const nodemailer = require("nodemailer");
const gmail_auth_user = process.env.GMAIL_AUTH_USER;
const gmail_auth_pass = process.env.GMAIL_AUTH_PASS;
const mail_from = process.env.MAIL_FROM;

const sendOtpMail = async (req, res, next) => {
    console.log("sendOtpMail middleware ...");

    const otp = req.user.otp;
    const to = req.user.email;
    const subject = "OTP for mail verification";
    const html = `
        <h1>Your OTP is below</h1>
        <p>${otp}</p>
    `;

    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: gmail_auth_user,
            pass: gmail_auth_pass,
        },
    });

    const mailOptions = {
        from: `${mail_from} <${gmail_auth_user}>`,
        to,
        subject,
        html,
    };

    try {
        await transporter.sendMail(mailOptions);
        next();
    } catch (error) {
        next(new AppError("Verification email sending failed !", 500));
        await User.findByIdAndDelete(req.user._id);
    }
};

module.exports = sendOtpMail;
