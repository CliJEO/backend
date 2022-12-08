//Usage npm delete-media file1 file2 ...
const files = process.argv.slice(2);
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const sequelize = require("../db");

sequelize.models.media
  .destroy({
    where: {
      filename: files,
    },
  })
  .then((res) => {
    for (const file of files) {
      fs.unlink(path.join(process.env.MEDIA_DIR, file), (err) => {
        if (err) {
          console.log(`Error deleting ${file}: ${err.message}`);
        } else {
          console.log("Deleted " + file);
        }
      });
    }
  });
