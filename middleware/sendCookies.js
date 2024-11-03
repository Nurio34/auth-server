const createCookieAndSend = require("../utils/createCookieAndSend");

const sendCookies = (req, res) => {
    const user = req.user;

    user.password = null;
    user.passwordConfirm = null;
    user.otp = null;

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
