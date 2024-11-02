const jwt = require("jsonwebtoken");
const jwt_secret = process.env.JWT_SECRET;
const jwt_expires_in = process.env.JWT_EXPIRES_IN;
const cookies_expires_in = process.env.COKKIES_EXPIRES_IN;
const node_env = process.env.NODE_ENV;

const sendCookies = (req, res) => {
    console.log("sendCookies function ...");

    const user = req.user;

    const token = jwt.sign({ id: user._id }, jwt_secret, {
        expiresIn: jwt_expires_in,
    });

    const cookiesOption = {
        expires: new Date(
            Date.now() + cookies_expires_in * 24 * 60 * 60 * 1000,
        ),
        httpOnly: true,
        secure: node_env === "production",
        samSite: node_env === "production" ? "none" : "Lax",
    };

    res.cookie("token", token, cookiesOption);

    user.password = null;
    user.passwordConfirm = null;
    user.otp = null;

    return res.status(200).json({
        status: "success",
        message: "Message",
        token,
        user,
    });
};

module.exports = sendCookies;
