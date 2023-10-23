const mongoose = require("mongoose");

const characterSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    url: {
        type: String,
        unique: true
    },
    name: {
        type: String,
    },
    gender: {
        type: String,
        required: true,
    },
    culture: {
        type: String,
    },
    aliases: [
        {
        type: String,
        },
    ],
    books: [
        {
            type: String,
        // type: mongoose.Schema.Types.ObjectId,
        // ref: "Books",
        }
    ],
    povBooks: [
        {
            type: String,
        }
    ],
    playedBy: [
        {
            type: String,
        },
    ]
});

module.exports = mongoose.model("Characters", characterSchema);