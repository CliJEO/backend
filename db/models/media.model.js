const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "media",
    {
      filename: {
        primaryKey: true,
        type: DataTypes.STRING,
      },
      // queryId
    },
    {
      createdAt: "uploadTime",
      updatedAt: false,
    }
  );
};
