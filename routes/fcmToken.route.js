const express = require("express");
const router = express.Router();
const fcmTokenController = require("../controllers/fcmToken.controller");
const { verifyAdminToken: adminAuth, verifyUserToken: userAuth } = require("../middlewares/auth");

router.post("/save/admin", adminAuth, fcmTokenController.saveAdmin);

router.post("/save/user", userAuth, fcmTokenController.saveUser);

// todo auto remove stale tokens

module.exports = router;
