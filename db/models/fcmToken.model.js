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
      timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
