const multer = require("multer");

// Multer storage configuration
const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only PDF files are allowed."), false);
  }
};

exports.upload = multer({ storage, fileFilter, limits: { fileSize: 5242880 } });
