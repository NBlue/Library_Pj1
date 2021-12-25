const express = require("express");
const router = express.Router();

const { check, validationResult } = require("express-validator");

const siteController = require("../app/controllers/siteController");

router.use("/search", siteController.search);

// Accout
router.post(
    "/accout/:id",
    [
        check("Name", "Trường này yêu cầu bắt buộc!")
            .not()
            .matches(/\d/)
            .withMessage("Tên không chứa số!")
            .notEmpty(),
        check("Email", "Trường này yêu cầu bắt buộc!")
            .isEmail()
            .withMessage("Yêu cầu đúng định dạng email")
            .notEmpty(),
        check("Address", "Trường này yêu cầu bắt buộc!").notEmpty(),
        check("Username", "Trường này yêu cầu bắt buộc!")
            .not()
            .isIn("admin")
            .withMessage("Username đã được sử dụng!")
            .custom(async (value) => {
                const result = await siteController.findUserByUsername(value);
                console.log({ result: result });
                if (result.length > 0) {
                    throw new Error("Username đã tồn tại!");
                }
            })
            .isLength({ min: 6 })
            .withMessage("Tên đăng nhập >= 6 kí tự!")
            .notEmpty(),
    ],
    siteController.updateInfo
);

router.get("/accout/:id", siteController.getInfo);

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
        check("username", "Trường này yêu cầu bắt buộc!")
            .not()
            .isIn("admin")
            .withMessage("Username đã được sử dụng!")
            .custom(async (value) => {
                const result = await siteController.findUserByUsername(value);
                console.log({ result: result });
                if (result.length > 0) {
                    throw new Error("Username đã tồn tại!");
                }
            })
            .isLength({ min: 8 })
            .withMessage("Tên đăng nhập >= 3 kí tự!")
            .notEmpty(),
        check("password", "Trường này yêu cầu bắt buộc!")
            .isLength({ min: 6 })
            .matches(/\d/)
            .withMessage("Mật khẩu ít nhất 6 kí tự và phải chứa số!")
            .notEmpty(),
        check("password_confirmation", "Trường này yêu cầu bắt buộc!")
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error("Mật khẩu xác thực không đúng");
                }
                return true;
            })
            .notEmpty(),
    ],
    siteController.addAccUser
);
router.get("/register", siteController.getRegister);

module.exports = router;
