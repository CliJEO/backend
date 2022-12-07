const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "media",
    {
      // id
      filename: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      path: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      type: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      // queryId
      // responseId
    },
    {
      createdAt: "uploadTime",
      updatedAt: false,
    }
  );
};
