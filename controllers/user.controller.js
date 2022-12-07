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

  try {
    // const dbUser = await user.findByPk(userId);
    const [_, firstLogin] = await user.findOrCreate({
      where: {
        id: userId,
      },
      defaults: {
        name: payload.name,
        email: payload.email,
        profilePicture: payload.picture,
      },
    });
    return res.json({
      firstLogin,
      jwt: generateUserToken(userId),
    });
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
}

async function me(req, res) {
  return res.json(req.user);
}

async function update(req, res) {
  const name = req.body.name;
  if (!name) {
    return res.status(401).json({ message: "Invalid name" });
  }
  req.user.name = name;
  await req.user.save();
  return res.json({ ok: true });
}

module.exports = { login, me, update };
