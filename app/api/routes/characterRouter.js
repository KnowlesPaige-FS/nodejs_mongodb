const express = require("express");
const router = express.Router();
const {
    getCharacter,
    getCharacterById,
    createCharacter,
    updateCharacter, 
    deleteCharacter
} = require("../controllers/characterController");
const characters = require("../models/characters");

router.get("/", getCharacter);

router.get("/:id", getCharacterById);

router.post("/", createCharacter);

router.put("/:id", updateCharacter);

router.delete("/:id", deleteCharacter);


module.exports = router;
