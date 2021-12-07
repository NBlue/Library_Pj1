const express = require("express");
const router = express.Router();

const userBooksController = require("../app/controllers/userBooksController");

// Get book list
router.get("/books/khcn", userBooksController.getBook);

module.exports = router;
