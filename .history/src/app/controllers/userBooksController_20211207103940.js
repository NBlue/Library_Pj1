const Books = require("../models/adminBooksModels");
const modelBooks = new Books();
const Author = require("../models/adminAuthorsModels");
const modelAuthors = new Author();

class BooksController {
    getBookKhcn(req, res) {
        modelBooks.findBookByTypeBook(
            "Khoa học công nghệ - Kinh tế",
            (err, data) => {
                console.log(data);
                for (let element of data) {
                    modelAuthors.findByIdBook(
                        element.IdBook,
                        (err, dataAuthor) => {
                            console.log(dataAuthor.array);
                        }
                    );
                }
                res.render("user/user_books", { data });
            }
        );
    }
}

module.exports = new BooksController();
