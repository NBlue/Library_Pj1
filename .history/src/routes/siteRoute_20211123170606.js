const express = require("express");
const router = express.Router();

const { check, validationResult } = require("express-validator");

const siteController = require("../app/controllers/siteController");

router.use("/search", siteController.search);

// ROUTER mặc định
router.get("/", siteController.getHome);

router.post(
    "/",
    [check("username", "Yêu cầu nhập tên").exists.isLength({ min: 3 })],
    siteController.checkAdmin
);

module.exports = router;
