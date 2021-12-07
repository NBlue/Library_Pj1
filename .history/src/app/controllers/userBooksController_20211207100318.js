const Books = require("../models/adminBooksModels");
const modelBooks = new Books();

class BooksController {
    getBookKhcn(req, res) {
        modelBooks.findBookByTypeBook(
            "Khoa học công nghệ - Kinh tế",
            (err, data) => {
                res.render("user/user_books", { data });
            }
        );
    }
}

module.exports = new BooksController();
