const express = require("express");
const router = express.Router();
const adminHomeController = require("../app/controllers/adminHomeConstroller");

router.get("/home", adminHomeController.statisticHome);

router.put("/users/updateCore/:id", adminHomeController.updateScore);
router.put("/users/block/:id", adminHomeController.LockAccout);

router.put("/users/:id", adminHomeController.openLockUser);

module.exports = router;
