const express = require("express");
const router = express.Router();

const booksController = require("../app/controllers/booksController");

router.get("/:id", booksController.getById);
router.get("/", booksController.getList);
router.post("/", booksController.addNew);
router.put("/", booksController.update);
router.delete("/:id", booksController.delete);

module.exports = router;
