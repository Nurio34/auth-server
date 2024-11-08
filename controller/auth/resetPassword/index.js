const vjs = require("validator");
const User = require("../../../model/user");
const AppError = require("../../../utils/appError");

const resetPassword = async (req, res, next) => {
    const { email, otp, newPassword, newPasswordConfirm } = req.body;

    if (!email || email.trim() === "" || !vjs.isEmail(email))
        return next(new AppError("Please provide your email !", 400));

    if (!otp || otp.trim() === "")
        return next(new AppError("Check your email for OTP !", 400));

    const user = await User.findOne({ email });

    if (!user)
        return next(
            new AppError("There is not an account with this email !", 404),
        );

    if (otp !== user.resetPasswordOtp)
        return next(new AppError("Incorrect OTP !", 400));
    console.log({ newPassword, newPasswordConfirm });

    user.password = newPassword;
    user.passwordConfirm = newPasswordConfirm;

    await user.save();
    console.log(user);
};

module.exports = resetPassword;
