const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");
const { verifyAdminToken: auth } = require("../middlewares/auth");

router.post("/login", adminController.login);

router.post("/create", auth, adminController.create);

router.put("/update", auth, adminController.update);

module.exports = router;
