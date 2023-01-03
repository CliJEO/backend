const sequelize = require("../db");
const { notifyUserAboutUpdate, notifyAllAdmins } = require("../utils/notifHandler");

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

  await notifyAllAdmins(query, false);

  return res.json({ ok: true });
}

async function adminCreate(req, res) {
  const queryId = req.params.queryId;
  const content = req.body.content;

  if (!content) {
    return res.status(400).json({ message: "Invalid response to query" });
  }

  const query = await sequelize.models.query.findByPk(queryId, { raw: true });

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

  try {
    await notifyUserAboutUpdate(query, { id: query.userId });
  } catch (err) {
    return res.json({ ok: false, warning: err.message });
  }

  return res.json({ ok: true });
}

module.exports = { userCreate, adminCreate };
