const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const checkIfEmailAlreadyRegistered = require("../controller/signup/checkIfEmailAlreadyRegistered");
const createOtp = require("../controller/signup/createOtp");
const createNewUser = require("../controller/signup/createNewUser");
const sendOtpMail = require("../controller/signup/sentOtpMail");
const sendCookies = require("../controller/signup/sendCookies");

router.post(
    "/",
    catchAsync(checkIfEmailAlreadyRegistered),
    catchAsync(createOtp),
    catchAsync(createNewUser),
    catchAsync(sendOtpMail),
    sendCookies,
);

module.exports = router;
