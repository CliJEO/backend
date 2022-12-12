function applyAssociations(sequelize) {
  const { query, user, media, response, admin } = sequelize.models;

  user.hasMany(query);
  query.belongsTo(user);

  query.hasMany(response);
  response.belongsTo(query);

  query.hasMany(media);
  media.belongsTo(query, { allowNull: false });

  response.belongsTo(admin, { foreignKey: "adminResponder", allowNull: true });

  // media.belongsTo(response, { allowNull: true });
}

module.exports = { applyAssociations };
