const express = require("express");
const router = express.Router();

const booksController = require("../app/controllers/booksController");

router.use("/", booksController.index);

module.exports = router;
