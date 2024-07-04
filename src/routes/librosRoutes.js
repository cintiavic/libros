const express = require("express");
const path = require("path");
const router = express.Router();
const librosController = require("../controllers/librosController");
const upload = require("../multerConfig.js")

router.get("/", librosController.getAllLibros);
router.get("/:id", librosController.getLibro);

router.put("/:id", upload.single('portadaLibro'), librosController.actualizarLibro);
router.post('/', upload.single('portadaLibro'), librosController.crearLibro);

router.delete("/:id", librosController.borrarLibro);

module.exports = router;

/*
👉upload.single('imagenLibro'):

- upload es una instancia de multer, configurada previamente para manejar la subida de archivos.
- single('imagenLibro') es un método de multer que indica que se espera un solo archivo en la solicitud con el campo de formulario llamado imagenLibro.
- Este middleware procesa la subida del archivo y lo guarda en el directorio configurado en multerConfig.js. También agrega información sobre el archivo subido a la propiedad req.file.

*/