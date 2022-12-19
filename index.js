require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const app = express();
const sequelize = require("./db");
const port = process.env.PORT || 3000;

app.use(logger("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Who lives in a pineapple under the sea?</h1>");
});

app.use("/user", require("./routes/user.route"));
app.use("/admin", require("./routes/admin.route"));
app.use("/query", require("./routes/query.route"));
app.use("/media", require("./routes/media.route"));
app.use("/respond", require("./routes/response.route"));
app.use("/fcm-token", require("./routes/fcmToken.route"));

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });

  return;
});

async function init() {
  try {
    await sequelize.authenticate();
    console.log("Database connection OK!");
  } catch (error) {
    console.log("Unable to connect to the database:");
    console.log(error.message);
    process.exit(1);
  }

  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });
}

init();
