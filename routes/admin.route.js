const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");
import { verifyAdminToken as auth } from "../middlewares/auth";

router.post("/login", adminController.login);

router.post("/create", auth, adminController.create);

module.exports = router;
