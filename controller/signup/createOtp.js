const createOTP = async (req, res, next) => {
    console.log("createOtp middleware ...");

    const otp = Math.floor(Math.random() * 9000 + 1000);
    const otpExpires = Date.now() + 24 * 60 * 60 * 1000;
    req.otp = otp;
    req.otpExpires = otpExpires;

    next();
};

module.exports = createOTP;
