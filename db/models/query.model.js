const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "query",
    {
      // id
      // userId [belongsTo User],
      content: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      closed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      createdAt: "timestamp",
      updatedAt: false,
    }
  );
};
