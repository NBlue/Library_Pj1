const express = require("express");
const router = express.Router();
const adminHomeController = require("../app/controllers/adminHomeConstroller");

router.get("/home", adminHomeController.statisticHome);

router.put("/user/:id", (req, res) => {
    res.send("Gửi thành công!");
});

module.exports = router;
