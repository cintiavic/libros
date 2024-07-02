const express = require("express");
const path = require("path");
const router = express.Router();
const librosController = require(path.join(__dirname,"../controllers/librosController.js"));


router.get("/", librosController.getAllLibros);
router.get("/:id", librosController.getLibro);
router.post("/", librosController.crearLibro);
router.put("/:id", librosController.actualizarLibro);
router.delete("/:id", librosController.borrarLibro);

module.exports = router;

