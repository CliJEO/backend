const { applyAssociations } = require("./associations");
const sequelize = require("../config/sequelize");

const modelDefiners = [
  require("./models/media.model"),
  require("./models/query.model"),
  require("./models/response.model"),
  require("./models/user.model"),
  require("./models/admin.model"),
  require("./models/fcmToken.model"),
];

for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}

applyAssociations(sequelize);

sequelize.sync({ alter: true });

module.exports = sequelize;
