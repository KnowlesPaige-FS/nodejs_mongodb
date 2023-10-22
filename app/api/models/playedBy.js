const mongoose = require("mongoose");

const playedBySchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
    },
    playedBy: [
        {
        type: String,
        },
    ]
});

module.exports = mongoose.model("PlayedBy", playedBySchema);