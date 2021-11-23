const express = require("express");
const router = express.Router();

const adminUsersController = require("../app/controllers/adminUsersConstroller");

router.get("/", adminUsersController.getList);
