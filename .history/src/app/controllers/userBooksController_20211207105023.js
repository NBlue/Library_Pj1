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
                console.log(dataBook);
                for (let element of dataBook) {
                    modelAuthors.findByIdBook(
                        element.IdBook,
                        (err, dataAuthor) => {
                            let authorStr = dataAuthor.reduce(
                                (result, data) => {
                                    return result + ", " + data.Name;
                                },
                                ""
                            );
                            console.log(authorStr);
                        }
                    );
                }
                res.render("user/user_books", { data });
            }
        );
    }
}

module.exports = new BooksController();
