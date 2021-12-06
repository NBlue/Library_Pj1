const express = require("express");
const router = express.Router();

const { check, validationResult } = require("express-validator");

const adminBooksController = require("../app/controllers/adminBooksController");

// Get book create form
router.get("/add", adminBooksController.getAddBook);

// Book add
router.post(
    "/add",
    [
        check("bookName", "Yêu cầu nhập tên sách!").notEmpty(),
        check("typeBook", "Yêu cầu nhập loại sách!").notEmpty(),
        check("numberBook", "Yêu cầu nhập số lượng sách!").notEmpty(),
        check("description", "Yêu cầu nhập mô tả sách!").notEmpty(),
    ],
    adminBooksController.addNew
);
// Book detail
router.get("/:id", adminBooksController.getById);

// Book update
router.get("/update/:id", adminBooksController.getUpdate);

router.put(
    "/update/:id",
    [
        check("Name", "Yêu cầu nhập tên sách!").notEmpty(),
        check("TypeBook", "Yêu cầu nhập loại sách!").notEmpty(),
        check("Quantity", "Yêu cầu nhập số lượng sách!").notEmpty(),
        check("Review", "Yêu cầu nhập mô tả sách!").notEmpty(),
    ],
    adminBooksController.update
);

router.delete("/:id", adminBooksController.delete);

// Book show
router.get("/", adminBooksController.getList);

module.exports = router;
