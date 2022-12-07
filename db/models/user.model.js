const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      profilePicture: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      deviceToken: {
        allowNull: true,
        type: DataTypes.STRING,
      },
    },
    { timestamps: false }
  );
};
