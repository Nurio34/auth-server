const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const checkIfEmailAlreadyRegistered = require("../controller/auth/signup/checkIfEmailAlreadyRegistered");
const createOtp = require("../middleware/createOtp");
const createNewUser = require("../controller/auth/signup/createNewUser");
const sendOtpMail = require("../middleware/sentOtpMail");
const sendCookies = require("../middleware/sendCookies");
const checkAuthentication = require("../middleware/checkAuthentication");
const verifyOtp = require("../controller/auth/verifyEmail/verifyOtp");
const checkEmail = require("../controller/auth/resendOtp/checkEmail");
const updateUser = require("../controller/auth/resendOtp/updateUser");
const login = require("../controller/auth/login");
const logout = require("../controller/auth/logout");

router.post(
    "/signup",
    catchAsync(checkIfEmailAlreadyRegistered),
    createOtp,
    catchAsync(createNewUser),
    catchAsync(sendOtpMail),
    sendCookies,
);

router.post(
    "/verify-email",
    catchAsync(checkAuthentication),
    catchAsync(verifyOtp),
);

router.post(
    "/resend-otp",
    catchAsync(checkEmail),
    createOtp,
    catchAsync(updateUser),
    catchAsync(sendOtpMail),
    sendCookies,
);

router.post("/login", catchAsync(login));

router.post("/logout", logout);

module.exports = router;
