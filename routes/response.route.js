const express = require("express");
const router = express.Router();
const responseController = require("../controllers/response.controller");
import { verifyAdminToken as adminAuth, verifyUserToken as userAuth } from "../middlewares/auth";

// Admin Endpoints
router.post("/admin", adminAuth, responseController.adminCreate);

// User Endpoints
router.post("/user", userAuth, responseController.userCreate);

module.exports = router;
