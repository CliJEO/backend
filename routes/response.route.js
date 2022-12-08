const express = require("express");
const router = express.Router();
const responseController = require("../controllers/response.controller");
const { verifyAdminToken: adminAuth, verifyUserToken: userAuth } = require("../middlewares/auth");

// Admin Endpoints
router.post("/:queryId/admin", adminAuth, responseController.adminCreate);

// User Endpoints
router.post("/:queryId/user", userAuth, responseController.userCreate);

module.exports = router;
