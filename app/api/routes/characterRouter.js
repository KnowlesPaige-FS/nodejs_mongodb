const express = require("express");
const router = express.Router();
const {
    getCharacter,
    getCharacterById,
    createCharacter,
    updateCharacter, 
    deleteCharacter
} = require("../controllers/characterController");

router.get("/", getCharacter);

router.get("/:id", getCharacterById);

router.post("/", createCharacter);

router.put("/:id", updateCharacter);

router.delete("/:id", deleteCharacter);


module.exports = router;
