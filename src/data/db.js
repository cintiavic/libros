const mysql = require("mysql2");
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    port: 3306
});

connection.connect((error)=>{
    if (error) {console.error("❌  Error al crear la conexión", error); return};
    console.log("☑️  Conexión existosa")
});

const sqlCreateDB = 'CREATE DATABASE IF NOT EXISTS bibliotecasimple DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci';

connection.query(sqlCreateDB, (err, results) => {
                        if (err) {console.error("❌  Error al crear la BD",err);return};
                        connection.changeUser({database:"bibliotecaSimple"}, (err)=>{
                                                                                if (err) {console.error("❌  Error al cambiar a la BD");return;}

                        })
                        const sqlCreateTable = 
                        'CREATE TABLE IF NOT EXISTS bibliotecasimple.libros (idLibro INT NOT NULL AUTO_INCREMENT, tituloLibro VARCHAR(45) NOT NULL, autorLibro VARCHAR(100) NOT NULL, generoLibro VARCHAR(45) NULL, anioLibro INT NULL, portadaLibro VARCHAR(255) NULL, PRIMARY KEY (idLibro));'
                        connection.query(sqlCreateTable, (err,results)=> {
                            if (err) {console.error("❌  Error al crear la Tabla",err); return}
                            console.log("☑️  Tabla creada exitosamente");
                        })
                        
}
);

module.exports = connection;