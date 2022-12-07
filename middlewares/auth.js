import jwt from "jsonwebtoken";
import sequelize from "../db";

async function verifyUserToken(req, res, next) {
  const tokenHeader = req.headers["Authorization"];
  if (!tokenHeader) {
    return res.status(400).send({ message: "Token is not provided" });
  }
  const token = tokenHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // verify user in db
    const user = sequelize.models.user.findByPk(decoded.userId);

    if (!user) {
      return res.status(400).send({ message: "Invalid Token" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(400).send(error);
  }
}

async function verifyAdminToken(req, res, next) {
  const tokenHeader = req.headers["Authorization"];
  if (!tokenHeader) {
    return res.status(400).send({ message: "Token is not provided" });
  }
  const token = tokenHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // verify admin in db
    const admin = sequelize.models.admin.findByPk(decoded.adminEmail);

    if (!admin) {
      return res.status(400).send({ message: "Invalid Token" });
    }

    req.admin = admin;
    next();
  } catch (error) {
    return res.status(400).send(error);
  }
}

module.exports = { verifyUserToken, verifyAdminToken };
