const express = require("express");
const router = express.Router();
const queryController = require("../controllers/media.controller");
import { verifyUserToken as userAuth } from "../middlewares/auth";

router.get("/:id", userAuth, mediaController.getOne);
router.post("/upload", userAuth, mediaController.upload);
router.delete("/:id", userAuth, mediaController.delete);

module.exports = router;
