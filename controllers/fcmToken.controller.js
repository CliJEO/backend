const sequelize = require("../db");
const { registerNewToken } = require("../utils/notifHandler");

//todo handle token receive errors
//maybe add token deets in /user/me

async function saveAdmin(req, res) {
  const fcmToken = req.body.fcmToken;
  if (!fcmToken) {
    return res.status(400).json({ message: "Please provide a valid token" });
  }

  try {
    await sequelize.models.fcmToken.create({
      token: fcmToken,
      adminEmail: req.admin.email,
      timestamp: new Date(),
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  await registerNewToken(fcmToken, "admin");

  return res.json({ ok: true });
}

async function saveUser(req, res) {
  const fcmToken = req.body.fcmToken;
  if (!fcmToken) {
    return res.status(400).json({ message: "Please provide a valid token" });
  }

  try {
    await sequelize.models.fcmToken.create({
      token: fcmToken,
      userId: req.user.id,
      timestamp: new Date(),
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  await registerNewToken(fcmToken, "user");

  return res.json({ ok: true });
}

module.exports = { saveAdmin, saveUser };
