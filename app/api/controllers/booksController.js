const mongoose = require("mongoose");
const Books = require("../models/books");
const Messages = require("../messages/messages");


const getBook = async (req, res, next) => {
    Books.find()
    .then((book) => {
        res.status(200).json({
            message: Messages.allBooks,
            name: book.map((book) => {
                return {
                    book: {
                        title: book.name,
                        authors: book.authors,
                        publisher: book.publisher,
                        releasedDate: book.released,
                        characters: book.characters,
                        povCharacters: book.povCharacters,
                        id: book._id,       
                    },   
                };
            }),
        });
    })
    .catch((err) => {
        console.error(err.message);
        res.status(500).json({
            error: {
                message: err.message,
            },
        });
    });
};

const getBookById = async (req, res, next) => {
    const { id } = req.params;
    return book = await Books.findById(id)
    .select("_id name authors publisher released characters")
    .populate("characters")
    .exec()
    .then((book) => {    
        if(!book) {
            return res.status(404).json({
                message: Messages.BookNotFound,
            });
        } else {
        res.status(200).json({
            status: "success",
            message: Messages.BookRetrieved,
            book: {
                title: book.name,
                    authors: book.authors,
                    publisher: book.publisher,
                    releasedDate: book.released,
                    characters: book.characters,
                    povCharacters: book.povCharacters,
                    id: book._id,             
            },
        });
        }
    })
    .catch((err) => {
        console.error(err.message);
        res.status(500).json({
            error: {
                message: err.message,
            },
        });
    });
};

const createBook = async (req, res, next) => {
        const { id } = req.body
        return book = await Books.findOne(
            id,
            req.body.title,
        {   
            new: true,
        }
        )
        .exec()
        .then(book => {
            if(!book) {
                const newBook = new Book({
                _id: mongoose.Types.ObjectId(),
                book: {
                    title: book.name,
                    authors: book.authors,
                    publisher: book.publisher,
                    releasedDate: book.released,
                    characters: book.characters,
                    povCharacters: book.povCharacters,           
                },
            });
            
            newBook
                .save()
                .then((result) => {
                    console.log(result);
                    res.status(200).json({
                        message: Messages.BookSaved,
                        name: {
                            book: {
                                title: result.book.name,
                                authors: result.book.authors,
                                publisher: result.book.publisher,
                                releasedDate: result.book.released,
                                characters: result.book.characters,
                                povCharacters: result.book.povCharacters,
                                id: result.book._id,             
                            },   
                        },
                    });
                })
                .catch((err) => {
                    console.error(err.message);
                    res.status(500).json({
                        error: {
                            message: "Unable to save the book with title: " + req.body.name,
                        },
                    });
                });
            } else {
                return res.status(406).json({
                    error: {
                        message: Messages.BookExists,
                    },
                });
            }
            // if(book) {
            //     return res.status(406).json({
            //         error: {
            //             message: Messages.BookExists,
            //         },
            //     });
            // } else {
            //     const newBook = new Book({
            //         _id: mongoose.Types.ObjectId(),
            //         book: {
            //             title: book.name,
            //             authors: book.authors,
            //             publisher: book.publisher,
            //             releasedDate: book.released,
            //             characters: book.characters,
            //             povCharacters: book.povCharacters,           
            //         },
            //     });
                
            //     newBook
            //         .save()
            //         .then((result) => {
            //             console.log(result);
            //             res.status(200).json({
            //                 message: Messages.BookSaved,
            //                 name: {
            //                     book: {
            //                         title: result.book.name,
            //                         authors: result.book.authors,
            //                         publisher: result.book.publisher,
            //                         releasedDate: result.book.released,
            //                         characters: result.book.characters,
            //                         povCharacters: result.book.povCharacters,
            //                         id: result.book._id,             
            //                     },   
            //                 },
            //             });
            //         })
            //         .catch((err) => {
            //             console.error(err.message);
            //             res.status(500).json({
            //                 error: {
            //                     message: "Unable to save the book with title: " + req.body.name,
            //                 },
            //             });
            //         });
            // };
        })
        .catch((err) => {
            console.error(err.message);
            res.status(500).json({
                error: {
                    message: err.message,
                },
            });
        });
};

const updateBook = async (req, res, next) => {
    const { id } = req.params;
    return book = await Books.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
    })
    .then((book) => {
        if(!book) {
            return res.status(404).json({
                message: Messages.BookNotFound,
            });
        } else {
            res.status(200).json({
                status: "success",
                message: Messages.updatedBook,
                book: {
                    book: {
                        title: book.name,
                        authors: book.authors,
                        publisher: book.publisher,
                        releasedDate: book.released,
                        characters: book.characters,
                        povCharacters: book.povCharacters,
                        id: book._id,             
                    },      
                },
            });
        }
    })
    .catch((err) => {
        console.error(err.message);
        res.status(500).json({
            error: {
                message: err.message,
            },
        });
    });
};

const deleteBook = async (req, res, next) => {
    const { id } = req.params;
    return book = await Books.findByIdAndDelete(id)
    .exec()
    .then((book) => {
        if(!book) {
            return res.status(404).json({
                message: Messages.BookNotFound,
            });
        } else {
            res.status(200).json({
                message: Messages.BookDeleted,
                request: {
                    method: "DELETE",
                    url: "http://localhost:40001/books/" + id,
                }
            });
        }
    })
    .catch((err) => {
        console.error(err.message);
        res.status(500).json({
            error: {
                message: err.message,
            },
        });
    });
};


module.exports = {
    getBook,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
}