const db = require("../data/db.js");

const getAllLibros = (req,res) => {
    const sqlAllLibros = 'SELECT * FROM libros;'
    db.query(sqlAllLibros,(error,results)=>{
        if (error) {throw(error)};
        res.json(results);
    })
};

const getLibro = (req,res) => {
    const id = req.params.id;
    const sqlLibro = 'SELECT * FROM libros WHERE idLibro= ?;'
    db.query(sqlLibro,[id],(error,results)=>{
        if (error) {throw(error)};
        res.json(results);
    })
};

const crearLibro  = (req,res) => {
    const {tituloLibro,autorLibro,generoLibro,anioLibro} = req.body;
    const sqlCrearLibro = 'INSERT INTO libros (tituloLibro,autorLibro,generoLibro,anioLibro) VALUES (?,?,?,?)';
    db.query(sqlCrearLibro,[tituloLibro,autorLibro,generoLibro,anioLibro],(error,results)=>{
        if (error) {throw(error)};
        res.json({mensaje: "Libro creado"});        
    })
};

const actualizarLibro = (req, res) => {
    const id = req.params.id;
    const {tituloLibro,autorLibro,generoLibro,anioLibro} = req.body;
    const sqlActualizarLibro = 'UPDATE libros SET tituloLibro = ?, autorLibro = ?, generoLibro = ?, anioLibro = ?  WHERE idLibro = ?;'
    db.query(sqlActualizarLibro,[tituloLibro,autorLibro,generoLibro,anioLibro,id],(error, results)=>{
        if (error) {throw(error)};
        res.json({mensaje:"Libro actualizado"});
    });
};

const borrarLibro = (req,res) => {
    const id = req.params.id;
    const sqlBorrarLibro = 'DELETE FROM libros WHERE idLibro = ?';
    db.query(sqlBorrarLibro,[id],(error,results)=>{
        if (error) {throw(error)};
        res.json({mensaje:"Libro eliminado"});
    })
};

module.exports = {getAllLibros,getLibro,crearLibro,actualizarLibro,borrarLibro};