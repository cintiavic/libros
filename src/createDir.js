
const fs = require('fs');
const path = require('path');

const createUploadDir = () => {
  const uploadDir = path.join(__dirname, '../public/uploads');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log('☑️  Directorio de uploads creado');
  }
};

module.exports = createUploadDir;