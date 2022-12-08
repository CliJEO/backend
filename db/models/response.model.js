const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "response",
    {
      // id
      // parentId [belongsTo User],
      content: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      // adminResponder [hasOne nullable]
      // the admin who responds to it. is null if it's the user response
    },
    {
      createdAt: "timestamp",
      updatedAt: false,
    }
  );
};
