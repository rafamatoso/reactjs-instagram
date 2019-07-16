const multer = require("multer");

// Biblioteca nativa do Node para tratar caminhos da mesma forma, mesmo em plataformas diferentes
const path = require("path");

module.exports = {
  storage: new multer.diskStorage({
    destination: path.resolve(__dirname, "..", "..", "uploads"),
    filename: function(req, file, callback) {
      callback(null, file.originalname);
    }
  })
};
