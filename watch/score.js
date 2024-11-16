const mongoose = require("mongoose");
const Score = require("../model/score");

const watchScores = (io) => {
    const changeStream = Score.watch();

    changeStream.on("change", (change) => {
        console.log({
            status: "Changes detected on Scores collection",
            message: change,
        });

        // Emit events based on the type of operation
        if (change.operationType === "insert") {
            io.emit("scoreInserted", change.fullDocument);
        } else if (change.operationType === "update") {
            io.emit("scoreUpdated", change.updateDescription.updatedFields);
        } else if (change.operationType === "delete") {
            io.emit("scoreDeleted", change.documentKey);
        }
    });
};

module.exports = watchScores;
