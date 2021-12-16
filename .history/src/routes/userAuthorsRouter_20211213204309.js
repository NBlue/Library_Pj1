const express = require("express");
const router = express.Router();
const userAuthorsController = require("../app/controllers/userAuthorsControler");

router.get("/", userAuthorsController.getAuthors);

module.exports = router;
