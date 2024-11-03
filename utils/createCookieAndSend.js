const jwt = require("jsonwebtoken");
const jwt_secret = process.env.JWT_SECRET;
const jwt_expires_in = process.env.JWT_EXPIRES_IN;
const cookies_expires_in = process.env.COKKIES_EXPIRES_IN;
const node_env = process.env.NODE_ENV;

const createCookieAndSend = (user, res, statusCode, message) => {
    console.log("createCookieAndSend function");

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

    return res.status(statusCode).json({
        status: "success",
        message,
        token,
    });
};

module.exports = createCookieAndSend;
