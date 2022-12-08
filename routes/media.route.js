const express = require("express");
const router = express.Router();
const mediaController = require("../controllers/media.controller");
const { verifyUserToken: userAuth, verifyAdminToken: adminAuth } = require("../middlewares/auth");
const multer = require("../config/multer");

router.get("/:filename", userAuth, mediaController.getOne);
router.get("/:filename/admin", adminAuth, mediaController.getOne);
module.exports = router;
