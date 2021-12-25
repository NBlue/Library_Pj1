const express = require("express");
const router = express.Router();

const userBooksController = require("../app/controllers/userBooksController");
const siteController = require("../app/controllers/siteController");

// Get book list
router.get("/khcn", userBooksController.getBookKhcn);
router.get("/vhnt", userBooksController.getBookVhnt);
router.get("/vhxh", userBooksController.getBookVhxh);
router.get("/gt", userBooksController.getBookGt);
router.get("/tt", userBooksController.getBookTt);
router.get("/tltg", userBooksController.getBookTltg);
router.get("/stn", userBooksController.getBookStn);

router.get("/detail/:id", userBooksController.getBookDetail);
router.get("/borrowing/:id", siteController.getBookBorrow);
module.exports = router;
