const db = require("../data/db.js");
const path = require("path");
const fs = require("fs");


const getAllLibros = (req, res) => {
    const { titulo, autor, genero, anio } = req.query;
    let sqlAllLibros = 'SELECT * FROM libros WHERE 1=1';
    const params = [];
  
    if (titulo) {
      sqlAllLibros += ' AND tituloLibro LIKE ?';
      params.push(`%${titulo}%`);
    }
    if (autor) {
      sqlAllLibros += ' AND autorLibro LIKE ?';
      params.push(`%${autor}%`);
    }
    if (genero) {
      sqlAllLibros += ' AND generoLibro = ?';
      params.push(genero);
    }
    if (anio) {
      sqlAllLibros += ' AND anioLibro = ?';
      params.push(anio);
    }
  
    db.query(sqlAllLibros, params, (error, results) => {
      if (error) { throw error; }
      res.json(results);
    });
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
   
    const portadaLibro = req.file ?  `../uploads/${req.file.filename}` : null;
   
    const sqlCrearLibro = 'INSERT INTO libros (tituloLibro,autorLibro,generoLibro,anioLibro,portadaLibro) VALUES (?,?,?,?,?)';
    db.query(sqlCrearLibro,[tituloLibro,autorLibro,generoLibro,anioLibro,portadaLibro],(error,results)=>{
        if (error) {throw(error)};
        res.json({mensaje: "Libro creado"});        
    })
};

const actualizarLibro = (req, res) => {
    const id = req.params.id;
    const {tituloLibro,autorLibro,generoLibro,anioLibro} = req.body;
    const portadaLibro = req.file ? req.file.filename : null;
    const sqlActualizarLibro = portadaLibro ?
    'UPDATE libros SET tituloLibro = ?, autorLibro = ?, generoLibro = ?, anioLibro = ?, portadaLibro = ? WHERE idLibro = ?' :
    'UPDATE libros SET tituloLibro = ?, autorLibro = ?, generoLibro = ?, anioLibro = ? WHERE idLibro = ?';
    db.query(sqlActualizarLibro,[tituloLibro,autorLibro,generoLibro,anioLibro,portadaLibro,id],(error, results)=>{
        if (error) {throw(error)};
        res.json({mensaje:"Libro actualizado"});
    });
};

const borrarLibro = (req,res) => {
    const id = req.params.id;

    // Obtener el nombre del archivo de la imagen del libro que se va a borrar
    const sqlObtenerLibro = 'SELECT portadaLibro FROM libros WHERE idLibro = ?';
    db.query(sqlObtenerLibro, [id], (error, results) => {
        if (error) {
            console.error('❌  Error al obtener el libro:', error);
            return res.status(500).json({ error: 'Error al obtener el libro' });
        }

        // Verificar si se encontró el libro
        if (results.length === 0) {
            return res.status(404).json({ error: 'Libro no encontrado' });
        }

        // Obtener el nombre del archivo de la imagen
        const nombreArchivo = results[0].portadaLibro;

        // Construir la ruta completa al archivo

   
        const rutaArchivo = path.join(__dirname, '../../public/uploads', nombreArchivo);
                 
        // Eliminar el archivo del sistema de archivos
        fs.unlink(rutaArchivo, (error) => {
            if (error) {
                console.error('❌  Error al eliminar la imagen:', error);
                return res.status(500).json({ error: 'Error al eliminar la imagen' });}
        });

    
    const sqlBorrarLibro = 'DELETE FROM libros WHERE idLibro = ?';
    db.query(sqlBorrarLibro,[id],(error,results)=>{
        if (error) {throw(error)};
        res.json({mensaje:"Libro eliminado"});
    })
      }
    );
    
  }
module.exports = {getAllLibros,getLibro,crearLibro,actualizarLibro,borrarLibro};