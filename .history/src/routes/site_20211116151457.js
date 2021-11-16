const express = require("express");
const router = express.Router();

const booksController = require("../app/controllers/booksController");

router.use("/:1", booksController.detail);
router.use("/", booksController.index);

module.exports = router;
