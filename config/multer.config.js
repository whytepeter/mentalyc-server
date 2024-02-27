const multer = require('multer');
const path = require('path');

// Ensure that the directory for uploads exists
const uploadDir = path.join(__dirname, '../uploads');

// Set up Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const multerInstance = multer({ storage: storage });

module.exports = { multerInstance };
