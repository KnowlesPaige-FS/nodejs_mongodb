const PlayedBy = require("../models/playedBy");

const getActor = async (req, res, next) => {
    PlayedBy.find()
    .then((actor) => {
        res.status(200).json({
            message: "All Books Retrieved",
            name: book.map((actor) => {
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
    // .select("book _id")
    // .populate("characters", "name book")
    .exec()
    .then((book) => {    
        if(!book) {
            return res.status(404).json({
                message: "BOOK NOT FOUND"
            });
        } else {
        res.status(200).json({
            status: "success",
            message: `${req.method} - Book Retrieved By Id`,
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
        return book = await Books.findOne({
            id,
            name: req.body.name, 
        })
        .exec()
        .then(book => {
            if(book) {
                return res.status(406).json({
                   error: {
                        message: "Book already exists",
                   },
                });
            } else {
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
                            message: "Book saved",
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
            };
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
        res.status(200).json({
            status: "success",
            message: `${req.method} - Book Updated`,
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
    .then(() => {
        res.status(200).json({
            message: "Book Deleted",
            request: {
                method: "DELETE",
                url: "http://localhost:40001/books/" + id,
            }
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


module.exports = {
    getBook,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
}