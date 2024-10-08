const multer = require("multer");
const path = require("path");
const { nanoid } = require("nanoid");

const storage = multer.diskStorage({
  destination: process.env.MEDIA_DIR,
  filename: function (req, file, cb) {
    cb(null, Date.now() + nanoid(5) + path.extname(file.originalname)); //Appending extension
  },
});

const allowedExtensions = [
  ".png",
  ".jpg",
  ".jpeg",
  ".mp4",
  ".mkv",
  ".mp3",
  ".aac",
  ".ogg",
  ".webm",
  ".webp",
  ".pdf",
  ".doc",
  ".docx",
  ".odt",
  ".m4a",
];

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname);
  if (allowedExtensions.includes(ext)) {
    return cb(null, true);
  }

  return cb(new Error("Invalid filetype"), false);
};

const limits = {
  fileSize: 50 * 1024 * 1024, // 50 MB
};

const upload = multer({ storage, fileFilter, limits });

module.exports = upload;
