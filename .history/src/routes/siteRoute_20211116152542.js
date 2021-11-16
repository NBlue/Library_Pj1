const express = require("express");
const router = express.Router();

const siteController = require("../app/controllers/siteController");

router.use("/search", siteController.search);
router.use("/site_home", siteController.index);

module.exports = router;
