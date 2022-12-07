if (process.argv[2] === "--help" || process.argv[2] === "-h") {
  console.log("Usage: npm add-admin <email> <name>");
}

const email = process.argv[2];
const name = process.argv[3] || "CliJEO Admin";

if (!/\S+@\S+\.\S+/.test(email) || !name) {
  console.log("Please enter email and name.");
  process.exit(0);
}

const sequelize = require("../db");
sequelize.models.admin
  .create({ email, name })
  .then(() => console.log("Admin created successfully"))
  .catch((err) => console.log(err.message));
