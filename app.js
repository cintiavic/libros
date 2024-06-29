const express = require("express");
const path = require("path");
const librosRoutes = require(path.join(__dirname, "./src/routes/librosRoutes"));

const app = express();

const PORT = 3001;

app.use(express.json());
/* app.use(express.urlencoded()); */
app.use(express.static(path.join(__dirname, "/public")));
app.use("/libros",librosRoutes);

app.listen(PORT,()=>{console.log(`Servidor escuchando en puerto ${PORT}`)})

module.exports = app;

