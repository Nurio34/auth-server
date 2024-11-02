const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const AppError = require("./utils/appError");
const error = require("./controller/error");

const SignupRouter = require("./route/signup");

const app = express();

app.use(
    express.json({
        limit: "10kb",
    }),
);

app.use(helmet());

app.use(cookieParser());

app.use(
    cors({
        origin: ["http://localhost:5137"],
        credentials: true,
    }),
);

app.use("/api/v1/signup", SignupRouter);

app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server !`, 404));
});

app.use(error);

module.exports = app;
