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
                data.forEach(async (element) => {
                    var dataAuthor = await modelAuthors.findByIdBook(
                        element.IdBook
                    );
                    if (dataAuthor.length > 1) {
                        let nameAuthor = dataAuthor.reduce(
                            (result, element) => {
                                return result + ", " + element.Name;
                            },
                            ""
                        );
                        console.log(nameAuthor);
                        element.NameAuthor = nameAuthor;
                    } else {
                        element.NameAuthor = dataAuthor[0].Name;
                    }
                });
                console.log(data);
                res.render("user/user_books", { data });
            }
        );
    }
}

module.exports = new BooksController();
