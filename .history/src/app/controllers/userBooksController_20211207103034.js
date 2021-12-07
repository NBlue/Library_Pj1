const Books = require("../models/adminBooksModels");
const modelBooks = new Books();
const Author = require("../models/adminAuthorsModels");
const modelAuthors = new Author();

class BooksController {
    getBookKhcn(req, res) {
        modelBooks.findBookByTypeBook(
            "Khoa học công nghệ - Kinh tế",
            (err, datas) => {
                console.log(datas);
                for (let data of datas) {
                    modelAuthors.findByIdBook(
                        data.IdBook,
                        (err, dataAuthor) => {
                            console.log(dataAuthor);
                            res.render("user/user_books", { data, dataAuthor });
                        }
                    );
                }
            }
        );
    }
}

module.exports = new BooksController();
