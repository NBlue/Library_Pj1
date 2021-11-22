const express = require("express");
const router = express.Router();

const adminAuthorsController = require("../app/controllers/adminAuthorsConstroller");

// Add Author show
router.get("/add", adminAuthorsController.getAdd);
// Add Author post
router.post("/add", adminAuthorsController.addNew);
// Update Author show
router.get("/update", adminAuthorsController.getUpdate);

// Author show
router.get("/", adminAuthorsController.getList);

module.exports = router;
