const express = require("express");
const router = express.Router();

const { check, validationResult } = require("express-validator");

const siteController = require("../app/controllers/siteController");

router.use("/search", siteController.search);

// ROUTER mặc định
router.get("/", siteController.getHome);

router.post(
    "/",
    [
        check("username", "Yêu cầu nhập tên > 3 kí tự")
            .exists()
            .isLength({ min: 3 }),
        check("password", "Yêu cầu nhập tên > 3 kí tự")
            .exists()
            .isLength({ min: 6 }),
    ],
    siteController.checkAdmin
);

module.exports = router;