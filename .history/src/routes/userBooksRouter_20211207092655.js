const express = require("express");
const router = express.Router();

// Get book list
router.get("/books/khcn", (req, res) => {
    res.json("Thành công");
});

module.exports = router;
