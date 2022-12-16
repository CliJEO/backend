const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      profilePicture: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      deviceToken: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      age: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      gender: {
        allowNull: true,
        type: DataTypes.STRING,
        validate: {
          customValidator: (value) => {
            const enums = ["male", "female", "other"];
            if (!enums.includes(value)) {
              throw new Error(value + " is not a valid gender");
            }
          },
        },
      },
      phoneNumber: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      location: {
        allowNull: true,
        type: DataTypes.STRING,
      },
    },
    { timestamps: false }
  );
};
