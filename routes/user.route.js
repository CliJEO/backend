const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const userAuth = require("../middlewares/auth").verifyUserToken;

router.post("/login", userController.login);

router.put("/update", userAuth, userController.update);

// will return userInfo and queries corresponding to the user
router.get("/me", userAuth, userController.me);

module.exports = router;
