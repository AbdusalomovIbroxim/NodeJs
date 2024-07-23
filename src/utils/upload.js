const multer = require('multer');
const path = require('path');

// Установка дискового хранилища
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, '..', 'public', 'images', 'products'));
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});


const upload = multer({ storage: storage });

module.exports = upload;
