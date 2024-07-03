const multer = require('multer');
const path = require('path');
const createUploadDir = require('./createDir');

// Asegurarse de que el directorio de uploads existe
createUploadDir();

// Configuración de almacenamiento para multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Filtros de archivo
const fileFilter = (req, file, cb) => {
  // Aceptar solo ciertos tipos de archivo
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(new Error('Tipo de archivo no permitido'), false);
  }
};

// Límite de tamaño del archivo (opcional)
const limits = {
  fileSize: 1000000
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: limits
});

module.exports = upload;