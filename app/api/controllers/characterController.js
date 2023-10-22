const mongoose = require("mongoose");
const Characters = require("../models/characters");
const Messages = require("../messages/messages");

const getCharacter = async (req, res, next) => {
    Characters.find()
    .then((character) => {
        res.status(200).json({
            message: Messages.allCharacters,
            name: character.map((character) => {
                return {
                    url: character.url,
                    name: character.name, 
                    gender: character.gender,
                    culture: character.culture,
                    aliases: character.aliases,
                    books: character.books,
                    povBooks: character.povBooks,
                    playedBy: character.playedBy,
                    id: character._id,    
                };
            }),
        })
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

const getCharacterById = async (req, res, next) => {
    const { id } = req.params;
    return character = await Characters.findById(id)
    // .select()
    // .populate("books", "characters name")
    .exec()
    .then((character) => {
        if(!character) {
            return res.status(404).json({
                message: "Character NOT FOUND"
            });
        } else {
        res.status(200).json({
            status: "success",
            message: Messages.CharacterFetched,
            name: {
                url: character.url,
                name: character.name,
                gender: character.gender,
                culture: character.culture,
                aliases: character.aliases,
                books: character.books,
                povBooks: character.povBooks,
                playedBy: character.playedBy,
                id: character._id,       
            },
        })
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

const createCharacter = async (req, res, next) => {
        const { id } = req.body
        return character = await Characters.findOne({
            id,
            name: req.body.name, 
        })
        .exec()
        .then((character) => {
            if(character) {
                return res.status(406).json({
                    error: {
                        message: Messages.CharacterExists,
                    },
                });
            } else {
                const newCharacters = new Characters({
                    name: {
                        _id: new mongoose.Types.ObjectId(),
                        url: req.character.url,
                        name: req.character.name, 
                        gender: req.character.gender,
                        culture: req.character.culture,
                        aliases: req.character.aliases,
                        books: req.character.books,
                        povBooks: req.character.povBooks,
                        playedBy: req.character.playedBy, 
                    }
                });
                
                newCharacters
                    .save()
                    .then((result) => {
                        console.log(result);
                        res.status(200).json({
                            message: Messages.CharacterSaved,
                            name: {
                                url: result.url,
                                name: result.name, 
                                gender: result.gender,
                                culture: result.character.culture,
                                aliases: result.character.aliases,
                                books: result.character.books,
                                povBooks: result.character.povBooks,
                                playedBy: result.playedBy,
                                id: result._id,    
                            }
                        })
                    })
                    .catch((err) => {
                        console.error(err.message);
                        res.status(500).json({
                            error: {
                                message: "Unable to save the character with name: " + req.body.name,
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

const updateCharacter = async (req, res, next) => {
    const { id } = req.params;
    return character = await Characters.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
    })
    .then((character) => {
        res.status(200).json({
            status: "success",
            message: Messages.updatedCharacter,
            name: {
                url: character.url,
                name: character.name,
                gender: character.gender,
                culture: character.culture,
                aliases: character.aliases,
                books: character.books,
                povBooks: character.povBooks,
                playedBy: character.playedBy,
                id: character._id,       
            },
        })
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

const deleteCharacter = async (req, res, next) => {
    const { id } = req.params;
    return character = await Characters.findByIdAndDelete(id)
    .exec()
    .then(() => {
        res.status(200).json({
            message: Messages.CharacterDeleted,
            request: {
                method: "DELETE",
                url: "http://localhost:40001/characters/" + id,
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
    getCharacter,
    getCharacterById,
    createCharacter,
    updateCharacter,
    deleteCharacter,
}