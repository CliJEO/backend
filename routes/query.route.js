const express = require("express");
const router = express.Router();
const queryController = require("../controllers/query.controller");
const { verifyAdminToken: adminAuth, verifyUserToken: userAuth } = require("../middlewares/auth");
const multer = require("../config/multer");

// Admin Endpoints
router.get("/admin/pending", adminAuth, queryController.getPending);
router.get("/admin/archived", adminAuth, queryController.getArchived);
router.get("/:id/admin", adminAuth, queryController.getOne);
router.post("/admin/close/:id", adminAuth, queryController.close);

// User Endpoints
router.post("/create", userAuth, multer.array("files", 4), queryController.create);
router.get("/:id", userAuth, queryController.getOne);

module.exports = router;
