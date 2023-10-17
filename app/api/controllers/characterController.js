const Characters = require("../models/characters");

const getCharacter = async (req, res, next) => {
    Characters.find()
    .then((character) => {
        res.status(200).json({
            message: "All Characters Retrieved",
            name: character.map((character) => {
                return {
                name: character.name, 
                gender: character.gender,
                aliases: character.aliases,
                playedBy: character.playedBy,
                id: character._id,    
                };
            }),
            metadata: {
                host: req.hostname,
                method: req.method,
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

const getCharacterById = async (req, res, next) => {
    const { id } = req.params;
    return character = await Characters.findById(id)
    .then((character) => {
        res.status(200).json({
            status: "success",
            message: `${req.method} - Characters Retrieved By Id`,
            name: {
                name: character.name,
                gender: character.gender,
                aliases: character.aliases,
                playedBy: character.playedBy,
                id: character._id,       
            },
            metadata: {
                host: req.hostname,
                method: req.method,
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

const createCharacter = async (req, res, next) => {
    const { id } = req.body;
    return character = await Characters.create({ id, name: req.body.name })
        .then((character) => {
            if (character) {
                return res.status(200).json({
                    message: "Character created",
                });
            } else {
                const newCharacter = new Character({
                    _id: mongoose.Types.ObjectId(),
                    name: req.character.name, 
                    gender: req.character.gender,
                    aliases: [req.character.aliases],
                    playedBy: [req.character.playedBy], 
                    // id: req.character.id,
                });

                newCharacter
                    .save()
                    .then((result) => {
                        console.log(result);
                        res.status(200).json({
                            message: "Character saved",
                            name: {
                                name: result.name, 
                                gender: result.gender,
                                aliases: [result.aliases],
                                playedBy: [result.playedBy],
                                id: result.id,    
                                metadata: {
                                    method: req.method,
                                    host: req.hostname,
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
            message: `${req.method} - GOT Character Updated`,
            name: {
                name: character.name,
                gender: character.gender,
                aliases: character.aliases,
                playedBy: character.playedBy,
                id: character._id,       
            },
            metadata: {
                host: req.hostname,
                method: req.method,
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

const deleteCharacter = async (req, res, next) => {
    const { id } = req.params;
    return character = await Characters.findByIdAndDelete(id)
    .then((character) => {
        res.status(200).json({
            status: "success",
            message: `${req.method} - GOT Character Deleted`,
            name: {
                name: character.name,
                gender: character.gender,
                aliases: character.aliases,
                playedBy: character.playedBy,
                id: character._id,       
            },
            metadata: {
                host: req.hostname,
                method: req.method,
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


module.exports = {
    getCharacter,
    getCharacterById,
    createCharacter,
    updateCharacter,
    deleteCharacter,
}