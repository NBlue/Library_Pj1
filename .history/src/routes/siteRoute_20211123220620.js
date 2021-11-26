const express = require("express");
const router = express.Router();

const { check, validationResult } = require("express-validator");

const siteController = require("../app/controllers/siteController");

router.use("/search", siteController.search);

// ROUTER mặc định
router.get("/", siteController.getHome);

// Đăng nhập
// router.post(
//     "/",
//     [
//         check("username", "Yêu cầu nhập tên > 3 kí tự")
//             .exists()
//             .isLength({ min: 3 }),
//         check("password", "Yêu cầu nhập tên > 6 kí tự")
//             .exists()
//             .isLength({ min: 6 }),
//     ],
//     siteController.checkAdmin
// );
//  Đăng ký
router.post("/", siteController.addAccUser);

module.exports = router;