function applyAssociations(sequelize) {
  const { query, user, media, response, admin, fcmToken } = sequelize.models;

  user.hasMany(query);
  query.belongsTo(user);

  query.hasMany(response);
  response.belongsTo(query);

  query.hasMany(media);
  media.belongsTo(query, { allowNull: false });

  response.belongsTo(admin, { foreignKey: "adminResponder", allowNull: true });

  fcmToken.belongsTo(admin, { allowNull: true });
  fcmToken.belongsTo(user, { allowNull: true });

  // media.belongsTo(response, { allowNull: true });
}

module.exports = { applyAssociations };
