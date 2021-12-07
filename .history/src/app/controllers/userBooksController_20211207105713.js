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
                    modelAuthors.findByIdBook(
                        element.IdBook,
                        (err, dataAuthor) => {
                            let authorStr = dataAuthor.reduce(
                                (result, data) => {
                                    return result + ", " + data.Name;
                                },
                                ""
                            );
                            data[index].NameAuthor = authorStr;
                            console.log(data);
                        }
                    );
                });
                console.log(data);
                res.render("user/user_books", { data });
            }
        );
    }
}

module.exports = new BooksController();
