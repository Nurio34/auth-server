const User = require("../../../model/user");

const updateUser = async (req, res, next) => {
    console.log("updateUser middleware");

    const user = req.user;
    const otp = req.otp;
    const otpExpires = req.otpExpires;

    const updatedUser = await User.findByIdAndUpdate(
        user._id,
        {
            otp,
            otpExpires,
        },
        { new: true },
    );

    req.user = updatedUser;
    next();
};

module.exports = updateUser;
