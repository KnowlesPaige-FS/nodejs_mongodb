const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
    },
    authors: [
        {
            type: String, 
            required: true,
        }
    ],
    publisher: {
        type: String, 
        required: true, 
    },
    released: {
        type: String,
    },
    characters: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Characters",
        // type: String,
        // required: true,
        }
    ],
});

module.exports = mongoose.model("Books", bookSchema);