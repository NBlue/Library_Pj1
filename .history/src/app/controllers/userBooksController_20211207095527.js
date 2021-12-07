const Books = require("../models/adminBooksModels");
const modelBooks = new Books();

class BooksController {
    getBook(req, res) {
        modelBooks.findBookByTypeBook(
            "Khoa học công nghệ - Kinh tế",
            (err, data) => {
                res.json(data);
            }
        );
    }
}

module.exports = new BooksController();
