const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "media",
    {
      filename: {
        primaryKey: true,
        type: DataTypes.STRING,
      },
      mimetype: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "file",
      },
      // queryId
    },
    {
      createdAt: "uploadTime",
      updatedAt: false,
    }
  );
};
