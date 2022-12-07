const { OAuth2Client } = require("google-auth-library");
const { generateUserToken } = require("../utils/tokenHandler");
const sequelize = require("../db");
const user = sequelize.models.user;

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
  const userId = payload.sub;

  const dbUser = await user.findByPk(userId);
  const firstLogin = !dbUser;

  if (firstLogin) {
    const userObj = {
      id: userId,
      name: payload.name,
      email: payload.email,
      profilePicture: payload.picture,
    };
    try {
      await user.create(userObj);
    } catch (err) {
      return res.status(401).json({ message: err.message });
    }
  }
  return res.json({
    firstLogin,
    jwt: generateUserToken(userId),
  });
}

async function me(req, res) {
  return res.json(req.user);
}

async function update(req, res) {}

module.exports = { login, me, update };
