const path = require("path");

const map = {
  ".png": "image",
  ".jpg": "image",
  ".jpeg": "image",
  ".webp": "image",
  ".mp4": "video",
  ".mkv": "video",
  ".mp3": "audio",
  ".aac": "audio",
  ".ogg": "audio",
  ".m4a": "audio",
  ".webm": "audio",
  ".pdf": "document",
  ".doc": "document",
  ".docx": "document",
  ".odt": "document",
};

module.exports.default = (filename) => map[path.extname(filename)];
