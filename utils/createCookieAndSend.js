const jwt = require("jsonwebtoken");
const jwt_secret = process.env.JWT_SECRET;
const jwt_expires_in = process.env.JWT_EXPIRES_IN;
const cookies_expires_in = process.env.COKKIES_EXPIRES_IN;
const node_env = process.env.NODE_ENV;

const createCookieAndSend = (user, res, statusCode, message) => {
    console.log("createCookieAndSend function");

    const isForgetPassword = res.isForgetPassword;

    const token = jwt.sign({ id: user._id }, jwt_secret, {
        expiresIn: jwt_expires_in,
    });

    // const cookiesOption = {
    //     expires: new Date(
    //         Date.now() + cookies_expires_in * 24 * 60 * 60 * 1000,
    //     ),
    //     httpOnly: true,
    //     secure: node_env === "production",
    //     samSite: node_env === "production" ? "none" : "Lax",
    // };

    const cookiesOption = {
        expires: new Date(
            Date.now() + cookies_expires_in * 24 * 60 * 60 * 1000,
        ),
        httpOnly: true,
        secure: true,
        sameSite: "none",
    };

    res.cookie("auth-token", token, cookiesOption);

    const userToSendClient = isForgetPassword
        ? null
        : {
              id: user._id,
              username: user.username,
              email: user.email,
              isVerified: user.isVerified,
              createdAt: user.createdAt,
          };

    return res.status(statusCode).json({
        status: "success",
        message,
        token,
<<<<<<< HEAD
        user: userToSendClient,
        otpExpires: user.otpExpires,
        resetPasswordOtpExpires: user.resetPasswordOtpExpires,
=======
        user,
>>>>>>> 61971ce356da84a4b3ab531866767fb3853968e0
    });
};

module.exports = createCookieAndSend;
