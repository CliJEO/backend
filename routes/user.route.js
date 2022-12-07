const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { verifyUserToken: auth } = require("../middlewares/auth");

router.post("/login", userController.login);

router.put("/update", auth, userController.update);

// will return userInfo and queries corresponding to the user
router.get("/me", auth, userController.me);

module.exports = router;
