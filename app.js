const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const AppError = require("./utils/appError");
const error = require("./controller/error");
//! *** SOCKET DEPENDENCIES ***
const http = require("http");
const socketIo = require("socket.io");
// const watchScores = require("./watch/score");
//! ***************************

const AuthRouter = require("./route/auth");

const app = express();

//! *** SOCKET.IO CONFIGURATION ***
const server = http.createServer(app);

const io = socketIo(server, {
    cors: {
        origin: [
            "http://localhost:3000",
            "https://auth-nurio34s-projects.vercel.app",
            "https://auth-beta-dusky.vercel.app",
        ],
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],

        credentials: true,
    },
});

//! *** SOCKET CONNECTION ***

const scores = [];

io.on("connection", (socket) => {
    console.log("User connected ...");

    socket.on("score", (score) => {
        scores.push(score);
        console.log({ status: "Scores updated", scores });

        // Emit the updated scores to all connected clients
        io.emit("scores", { status: "Updated scores", scores });
    });

    socket.on("disconnect", () => {
        console.log("User discconnected ...");
    });
});
//! *****************************

//! *** MONGODB "SCORES" COLLECTION REAL TIME CONNECTOIN ***
// watchScores(io);
//! *******************************************************

app.use(
    express.json({
        limit: "10kb",
    }),
);

app.use(helmet());

app.use(cookieParser());

app.use(
    cors({
        origin: [
            "http://localhost:3000",
            "https://auth-nurio34s-projects.vercel.app",
            "https://auth-beta-dusky.vercel.app",
        ],
        credentials: true,
    }),
);

app.use("/api/v1/auth", AuthRouter);

app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server !`, 404));
});

app.use(error);

module.exports = { server, io };
