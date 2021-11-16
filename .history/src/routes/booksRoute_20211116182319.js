const express = require("express");
const router = express.Router();

const booksController = require("../app/controllers/booksController");

router.get("/", booksController.getList);
router.get("/:id", booksController.getById);
router.post("/", booksController.addNew);
router.put("/", booksController.update);
router.delete("/:id", booksController.delete);

router.get("/", booksController.index);

module.exports = router;
