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
  return res.json({
    jwt: generateAdminToken(adminEmail),
  });
}

async function create(req, res) {}

module.exports = { login, create };
