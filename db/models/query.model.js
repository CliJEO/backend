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
      // media [hasMany media]
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
