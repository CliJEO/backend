const jwt = require("jsonwebtoken");
const sequelize = require("../db");
const { decodeUserToken, decodeAdminToken } = require("../utils/tokenHandler");

async function verifyUserToken(req, res, next) {
  const tokenHeader = req.headers.authorization;
  if (!tokenHeader) {
    return res.status(400).json({ message: "Token is not provided" });
  }
  const token = tokenHeader.split(" ")[1];

  try {
    const userId = decodeUserToken(token);

    // verify user in db
    const user = (await sequelize.models.user.findByPk(userId)).get({ plain: true });

    if (!user) {
      return res.status(400).json({ message: "Invalid Token" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

async function verifyAdminToken(req, res, next) {
  const tokenHeader = req.headers.authorization;
  if (!tokenHeader) {
    return res.status(400).json({ message: "Token is not provided" });
  }
  const token = tokenHeader.split(" ")[1];

  try {
    const adminEmail = decodeAdminToken(token);

    // verify admin in db
    const admin = (await sequelize.models.admin.findByPk(adminEmail)).get({ plain: true });

    if (!admin) {
      return res.status(400).json({ message: "Invalid Token" });
    }

    req.admin = admin;
    next();
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

module.exports = { verifyUserToken, verifyAdminToken };
