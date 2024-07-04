const express = require("express");
const path = require("path");
const createDir = require("./src/createDir");
const upload = require("./src/multerConfig");
const librosRoutes = require(path.join(__dirname, "./src/routes/librosRoutes"));

const app = express();
const PORT = 3002;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
// Servir archivos subidos desde la carpeta 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use("/libros",librosRoutes);

// Rutas para las páginas HTML
app.get("/altaLibro", (req, res) => {
    res.sendFile(path.join(__dirname, 'public/pages/altaLibro.html'));
});
app.get("/editarLibro", (req, res) => {
    res.sendFile(path.join(__dirname, 'public/pages/altaLibro.html'));
});

app.listen(PORT,()=>{console.log(`⚡Servidor escuchando en puerto ${PORT}`)});

module.exports = app;

