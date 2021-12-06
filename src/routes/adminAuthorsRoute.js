const express = require("express");
const router = express.Router();

const { check, validationResult } = require("express-validator");
const adminAuthorsController = require("../app/controllers/adminAuthorsConstroller");

// Add Author show
router.get("/add", adminAuthorsController.getAdd);
// Add Author post
router.post(
    "/add",
    [
        check("author__name", "Yêu cầu nhập tên tác giả!")
            .not()
            .matches(/\d/)
            .withMessage("Tên không chứa số!")
            .notEmpty(),
    ],
    adminAuthorsController.addNew
);
// Update Author show
router.get("/update/:id", adminAuthorsController.getUpdate);
// Update Author put
router.put(
    "/update/:id",
    [
        check("author__name", "Yêu cầu nhập tên tác giả!")
            .not()
            .matches(/\d/)
            .withMessage("Tên không chứa số!")
            .notEmpty(),
    ],
    adminAuthorsController.update
);
// Delete Author
router.delete("/:id", adminAuthorsController.delete);

// Author show
router.get("/", adminAuthorsController.getList);

module.exports = router;
