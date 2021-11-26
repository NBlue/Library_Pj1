const express = require("express");
const router = express.Router();

const { check, validationResult } = require("express-validator");

const siteController = require("../app/controllers/siteController");

router.use("/search", siteController.search);

// ROUTER mặc định
router.get("/", siteController.getHome);

// Đăng nhập
router.post(
    "/login",
    [
        check("username", "Yêu cầu nhập tên > 3 kí tự")
            .exists()
            .isLength({ min: 3 }),
        check("username", "Không được để trống!").notEmpty(),
        check("password", "Yêu cầu nhập tên > 6 kí tự")
            .exists()
            .isLength({ min: 6 }),
        check("password", "Không được để trống!").notEmpty(),
    ],
    siteController.checkAdmin
);
router.get("/login", siteController.getLogin);
//  Đăng ký
router.post(
    "/register",
    [
        check("fullname", "Trường này yêu cầu bắt buộc!")
            .not()
            .matches(/\d/)
            .withMessage("Tên không chứa số!")
            .notEmpty(),
        check("email", "Trường này yêu cầu bắt buộc!")
            .isEmail()
            .withMessage("Yêu cầu đúng định dạng email")
            .notEmpty(),
        check("address", "Trường này yêu cầu bắt buộc!").notEmpty(),
        check("username", "Trường này yêu cầu bắt buộc!").notEmpty(),
        check("password", "Trường này yêu cầu bắt buộc!").notEmpty(),
        check(
            "password_confirmation",
            "Trường này yêu cầu bắt buộc!"
        ).notEmpty(),
    ],
    siteController.addAccUser
);
router.get("/register", siteController.getRegister);

module.exports = router;