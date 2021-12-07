const express = require("express");
const router = express.Router();

// Get book list
router.get("/khcn", (req, res) => {
    res.json("Thành công");
});

module.exports = router;
