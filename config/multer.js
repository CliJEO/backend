const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: process.env.MEDIA_DIR,
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
  },
});

const allowedExtensions = [".png", ".jpg", ".jpeg", ".mp4", ".mkv", ".mp3", ".aac", ".ogg", ".webm"];

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname);
  if (allowedExtensions.includes(ext)) {
    cb(null, true);
  }

  // To reject this file pass `false`, like so:
  cb(new Error("Invalid filetype"), false);
};

const limits = {
  fileSize: 50 * 1024, // 50 MB
};

const upload = multer({ storage, fileFilter, limits });

module.exports = upload;
