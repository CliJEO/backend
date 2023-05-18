const { OAuth2Client } = require("google-auth-library");
const { generateAdminToken } = require("../utils/tokenHandler");
const sequelize = require("../db");
const admin = sequelize.models.admin;

async function login(req, res) {
  const token = req.body.idToken;
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  let ticket;
  try {
    ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
  const payload = ticket.getPayload();
  const adminEmail = payload.email;

  const dbAdmin = await admin.findByPk(adminEmail);
  if (!dbAdmin) {
    return res.status(401).json({ message: "Invalid admin" });
  }
  if (!dbAdmin.name) {
    dbAdmin.name = payload.name || "CliJEO Admin";
    await dbAdmin.save();
  }

  if (!dbAdmin.profilePicture) {
    dbAdmin.profilePicture = payload.picture;
    await dbAdmin.save();
  }

  return res.json({
    jwt: generateAdminToken(adminEmail),
  });
}

async function create(req, res) {
  const email = req.body.email;
  const name = req.body.name;

  if (!/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ message: "Invalid email provided" });
  }
  try {
    await admin.create({ email, name: name || undefined });
  } catch (err) {
    return res.status(500).json({ message: "Admin creation failed", more: err.message });
  }
  return res.json({ ok: true });
}

async function update(req, res) {
  const name = req.body.name;
  if (!name) {
    return res.status(401).json({ message: "Invalid name" });
  }
  await sequelize.models.admin.update({ name: name }, { where: { email: req.admin.email } });

  return res.json({ ok: true });
}

async function me(req, res) {

  const pendingQueries = await sequelize.models.query.findAll({
    attributes: ["id", "title", "timestamp", "content", "closed"],
    order: [["timestamp", "DESC"]],
    raw: true,
    include: { model: sequelize.models.user, attributes: ["name", "profilePicture"] },
  });

  for (const query of pendingQueries) {
    query.responseCount = await sequelize.models.response.count({ where: { queryId: query.id } });
  }

  const userObj = {
    ...req.admin,
    queries: pendingQueries
  };
  return res.json(userObj);
}

async function getUser(req, res) {

  const user = await sequelize.models.user.findByPk(req.params.id)

  if (!(user && (req.admin))) {
    return res.status(400).json({ message: "Cannot access this query" });
  }

  const userObj = user.get({ plain: true });
  return res.json(userObj);
}


module.exports = { login, create, update, me, getUser };
