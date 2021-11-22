const express = require("express");
const router = express.Router();

const siteController = require("../app/controllers/siteController");

router.use("/search", siteController.search);

// ROUTER mặc định
router.get("/", siteController.index);

module.exports = router;
