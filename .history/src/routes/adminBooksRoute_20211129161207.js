const express = require("express");
const router = express.Router();

const { check, validationResult } = require("express-validator");

const adminBooksController = require("../app/controllers/adminBooksController");

// Get book create form
router.get("/add", adminBooksController.getAddBook);
// Bookcreat
router.post(
    "/add/:grud",
    [
        check("bookName", "Tên sách không được để trống!").notEmpty(),
        check("typeBook", "Loại sách không được để trống!").notEmpty(),
        check("numberBook", "Số sách không được để trống!").notEmpty(),
        check("description", "Tên sách không được để trống!").notEmpty(),
    ],
    adminBooksController.addNew
);
router.post(
    "/add",
    [
        check("bookName", "Tên sách không được để trống!").notEmpty(),
        check("typeBook", "Loại sách không được để trống!").notEmpty(),
        check("numberBook", "Số sách không được để trống!").notEmpty(),
        check("description", "Tên sách không được để trống!").notEmpty(),
    ],
    adminBooksController.addNew
);
// Book detail
router.get("/:id", adminBooksController.getById);
// Book show
router.get("/", adminBooksController.getList);

router.put("/", adminBooksController.update);
router.delete("/:id", adminBooksController.delete);

module.exports = router;
