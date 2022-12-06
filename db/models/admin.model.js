const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "admin",
    {
      email: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      name: {
        allowNull: true,
        type: DataTypes.STRING,
      },
    },
    { timestamps: false }
  );
};
