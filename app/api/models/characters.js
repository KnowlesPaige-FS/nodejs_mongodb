const mongoose = require("mongoose");

const characterSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
    },
    aliases: [
        {
        type: String,
        required: true,
         },
    ],
    playedBy: [
        {
        type: String,
        required: true,
        },
    ],
    _id: Number,
});

module.exports = mongoose.model("Character", characterSchema);