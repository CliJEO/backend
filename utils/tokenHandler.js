const jwt = require("jsonwebtoken");

module.exports = {
  generateUserToken: (id) => {
    const token = jwt.sign(
      {
        userId: id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "365d" }
    );
    return token;
  },
  decodeUserToken: (token) => {
    return jwt.verify(token, process.env.JWT_SECRET).userId;
  },

  generateAdminToken: (email) => {
    const token = jwt.sign(
      {
        adminEmail: email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "365d" }
    );
    return token;
  },
  decodeAdminToken: (token) => {
    return jwt.verify(token, process.env.JWT_SECRET).adminEmail;
  },
};
