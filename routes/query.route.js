const express = require("express");
const router = express.Router();
const queryController = require("../controllers/query.controller");
import { verifyAdminToken as adminAuth, verifyUserToken as userAuth } from "../middlewares/auth";

// Admin Endpoints
router.get("/:id/admin", adminAuth, queryController.getOne);
router.get("/pending/admin", adminAuth, queryController.getPending);
router.post("/:id/close/admin", adminAuth, queryController.close);

// User Endpoints
router.get("/:id", userAuth, queryController.getOne);
router.post("/create", queryController.create);

module.exports = router;
