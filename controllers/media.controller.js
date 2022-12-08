const path = require("path");

async function getOne(req, res) {
  const filename = req.params.filename;
  return res.sendFile("1670490412464.png", { root: path.join(process.env.MEDIA_DIR) });
}

module.exports = { getOne };
