const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "response",
    {
      // id
      // parentId [belongsTo Query],
      content: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      // adminResponder (the admin who responds to it. is null if it's the user response)
    },
    {
      createdAt: "timestamp",
      updatedAt: false,
    }
  );
};
