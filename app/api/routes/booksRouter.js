const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const {
    getBook,
    getBookById,
    createBook,
    updateBook, 
    deleteBook
} = require("../controllers/booksController");

router.get("/", getBook);

router.get("/:id", getBookById);

router.post("/", createBook);

router.put("/:id", updateBook);

router.delete("/:id", deleteBook);


module.exports = router;