const Books = require("../models/adminBooksModels");
const modelBooks = new Books();

class BooksController {
    getBook(req, res) {
        res.json("Thành Công!");
    }
}

module.exports = new BooksController();
