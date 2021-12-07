const Books = require("../models/adminBooksModels");
const modelBooks = new Books();
const Author = require("../models/adminAuthorsModels");
const modelAuthors = new Author();

class BooksController {
    getBookKhcn(req, res) {
        modelBooks.findBookByTypeBook(
            "Khoa học công nghệ - Kinh tế",
            (err, dataBook) => {
                var data = dataBook;
                dataBook.forEach((element, index) => {
                    var dataAuthor = modelAuthors
                        .findByIdBook(element.IdBook)
                        .then((book) => {
                            return book;
                        });
                    console.log(dataAuthor);
                });
                res.render("user/user_books", { data });
            }
        );
    }
}

module.exports = new BooksController();
