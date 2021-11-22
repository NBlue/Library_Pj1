const express = require("express");
const router = express.Router();

const adminAuthorsController = require("../app/controllers/adminAuthorsConstroller");

// Add Author show
router.get("/add", adminAuthorsController.getAdd);
// Add Author post
router.post("/add", adminAuthorsController.addNew);
// Update Author show
router.get("/update/:id", adminAuthorsController.getUpdate);
// Update Author put
router.put("/update/:id", adminAuthorsController.update);
// Delete Author
router.delete("/:id", adminAuthorsController.delete);

// Author show
router.get("/", adminAuthorsController.getList);

module.exports = router;
