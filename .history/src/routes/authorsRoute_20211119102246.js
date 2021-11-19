const express = require("express");
const router = express.Router();

const authorsController = require("../app/controllers/authorsConstroller");

// Author show
router.get("/", authorsController.getList);

module.exports = router;
