const express = require("express");
const router = express.Router();
const mediaController = require("../controllers/media.controller");
import { verifyUserToken as userAuth } from "../middlewares/auth";
const upload = require("../config/multer");

router.post("/upload", userAuth, upload.single("file"), mediaController.upload);
router.get("/:id", userAuth, mediaController.getOne);
router.delete("/:id", userAuth, mediaController.delete);

module.exports = router;
