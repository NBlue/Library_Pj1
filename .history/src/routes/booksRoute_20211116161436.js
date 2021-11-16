const express = require("express");
const router = express.Router();

const booksController = require("../app/controllers/booksController");

router.get("/book", booksController.getList);
router.get("/book/:id", booksController.getById);
router.post("/book", booksController.addNew);
router.put("/book", booksController.update);
router.delete("/book/:id", booksController.delete);

router.get("/", booksController.index);

module.exports = router;
