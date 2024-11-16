const mongoose = require("mongoose");

const ScoreSchema = new mongoose.Schema(
    {
        player: String,
        score: Number,
    },
    { timestamps: true },
);

module.exports = mongoose.model("Scores", ScoreSchema);
