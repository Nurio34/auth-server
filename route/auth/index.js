const express = require("express");
const router = express.Router();
const catchAsync = require("../../utils/catchAsync");
const checkIfEmailAlreadyRegistered = require("../../controller/auth/signup/checkIfEmailAlreadyRegistered");
const createOtp = require("../../controller/auth/signup/createOtp");
const createNewUser = require("../../controller/auth/signup/createNewUser");
const sendOtpMail = require("../../controller/auth/signup/sentOtpMail");
const sendCookies = require("../../controller/auth/signup/sendCookies");

router.post(
    "/signup",
    catchAsync(checkIfEmailAlreadyRegistered),
    catchAsync(createOtp),
    catchAsync(createNewUser),
    catchAsync(sendOtpMail),
    sendCookies,
);

module.exports = router;
