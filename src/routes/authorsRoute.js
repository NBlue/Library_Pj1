const express = require("express");
const router = express.Router();

const authorsController = require("../app/controllers/authorsConstroller");

// Add Author show
router.get("/add", authorsController.getAdd);
// Add Author post
router.post("/add", authorsController.addNew);
// Author show
router.get("/", authorsController.getList);

module.exports = router;
