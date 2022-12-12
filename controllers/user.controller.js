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
  const user = req.user;
  const userQueries = await sequelize.models.query.findAll({ where: { userId: user.id }, raw: true });
  for (const query of userQueries) {
    query.responseCount = await sequelize.models.response.count({ where: { parentId: query.id } });
    delete query.userId;
  }

  const userObj = {
    ...req.user,
    deviceToken: undefined,
    queries: userQueries,
  };
  return res.json(userObj);
}

async function update(req, res) {
  const { name, gender, phoneNumber, location, age } = req.body;

  const userUpdates = {};
  if (name) userUpdates.name = name;
  if (gender) userUpdates.gender = gender;
  if (phoneNumber) userUpdates.phoneNumber = phoneNumber;
  if (location) userUpdates.location = location;
  if (age) userUpdates.age = age;

  await sequelize.models.user.update(userUpdates, { where: { id: req.user.id } });

  return res.json({ ok: true });
}

module.exports = { login, me, update };
