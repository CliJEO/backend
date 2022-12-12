const sequelize = require("../db");

async function userCreate(req, res) {
  const queryId = req.params.queryId;
  const content = req.body.content;

  if (!content) {
    return res.status(400).json({ message: "Invalid response to query" });
  }

  const query = await sequelize.models.query.findByPk(queryId);

  if (!query) {
    return res.status(400).json({ message: "Invalid query id" });
  }

  if (query.closed) {
    return res.status(401).json({ message: "Cannot respond to a closed query" });
  }

  if (query.userId != req.user.id) {
    return res.status(401).json({ message: "Cannot respond to this query" });
  }

  await sequelize.models.response.create({
    queryId,
    content,
    adminResponder: null,
  });

  return res.json({ ok: true });
}

async function adminCreate(req, res) {
  const queryId = req.params.queryId;
  const content = req.body.content;

  if (!content) {
    return res.status(400).json({ message: "Invalid response to query" });
  }

  const query = await sequelize.models.query.findByPk(queryId);

  if (!query) {
    return res.status(400).json({ message: "Invalid query id" });
  }

  if (query.closed) {
    return res.status(401).json({ message: "Cannot respond to a closed query" });
  }

  await sequelize.models.response.create({
    queryId,
    content,
    adminResponder: req.admin.email,
  });

  return res.json({ ok: true });
  //todo notify users
}

module.exports = { userCreate, adminCreate };
