const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "fcmToken",
    {
      token: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      //userId [belongsTo User],
      //adminId [belongsTo Admin]
      stale: {
        type: DataTypes.BOOLEAN,
        default: false,
        allowNull: false,
      },
      timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
