const express = require("express");
const router = express.Router();
const adminHomeController = require("../app/controllers/adminHomeConstroller");

router.get("/", adminHomeController.statisticHome);

module.exports = router;
