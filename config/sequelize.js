const { Sequelize } = require("sequelize");

// In a real app, you should keep the database connection URL as an environment variable.
// But for this example, we will just use a local SQLite database.
// const sequelize = new Sequelize(process.env.DB_CONNECTION_URL);
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "example-db.sqlite",
  logQueryParameters: true,
  benchmark: true,
});

// const sequelize = new Sequelize(process.env.DB_NAME, process.env.PG_USERNAME, process.env.PG_PASSWORD, {
//   host: "localhost",
//   dialect: "postgres",
//   logging: false,
// });

module.exports = sequelize;
