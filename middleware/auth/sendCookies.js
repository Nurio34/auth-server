const createCookieAndSend = require("../../utils/createCookieAndSend");

const sendCookies = (req, res) => {
    const user = req.user;

    const isForgetPassword = req.route.path === "/forget-password";
    res.isForgetPassword = isForgetPassword;

    user.password = "";
    user.passwordConfirm = "";
    user.otp = "";

    const isResendOtp = req.route.path === "/resend-otp";

    createCookieAndSend(
        user,
        res,
        200,
        isResendOtp
            ? "New OTP's been sent"
            : "OTP has been send to your email ...",
    );
};

module.exports = sendCookies;
