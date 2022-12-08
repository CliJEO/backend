const path = require("path");

async function getOne(req, res) {
  const filename = req.params.filename;
  return res.sendFile(filename, { root: path.join(process.env.MEDIA_DIR) });
}

module.exports = { getOne };
