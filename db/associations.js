function applyAssociations(sequelize) {
  const { query, user, media, response, admin } = sequelize.models;

  query.belongsTo(user);

  response.belongsTo(query, { foreignKey: "parentId" });
  response.belongsTo(admin, { foreignKey: "adminResponder", allowNull: true });

  media.belongsTo(query, { allowNull: false });
  // media.belongsTo(response, { allowNull: true });
}

module.exports = { applyAssociations };
