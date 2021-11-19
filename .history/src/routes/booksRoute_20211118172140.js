const express = require("express");
const router = express.Router();

const booksController = require("../app/controllers/booksController");

// Get book create form
router.get("/create", booksController.getCreatBook);
// Bookcreat
router.post("/create", booksController.addNew);
// Book detail
router.get("/:id", booksController.getById);
// Book show
router.get("/", booksController.getList);

router.put("/", booksController.update);
router.delete("/:id", booksController.delete);

module.exports = router;
