const express = require("express");
const router = express.Router();

const userBooksController = require("../app/controllers/userBooksController");

// Get book list
router.get("/khcn", userBooksController.getBookKhcn);

module.exports = router;
