module.exports = {
  generateUserToken: (id) => {
    const token = jwt.sign(
      {
        userId: id,
      },
      process.env.SECRET,
      { expiresIn: "365d" }
    );
    return token;
  },

  generateAdminToken: (email) => {
    const token = jwt.sign(
      {
        adminEmail: email,
      },
      process.env.SECRET,
      { expiresIn: "365d" }
    );
    return token;
  },
};
