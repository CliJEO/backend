// Usage: npm add-admin <email> <name>

const email = process.argv[2];
const name = process.argv[3];

if (!/\S+@\S+\.\S+/.test(email)) {
  console.log("Please enter email.");
  process.exit(0);
}

const sequelize = require("../db");
sequelize.models.admin
  .create({ email, name: name })
  .then(() => console.log("Admin created successfully"))
  .catch((err) => console.log(err.message));
