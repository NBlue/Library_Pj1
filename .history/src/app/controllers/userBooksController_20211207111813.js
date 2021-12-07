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
                dataBook.forEach(async (element, index) => {
                    var dataAuthor = await modelAuthors.findByIdBook(
                        element.IdBook
                    );
                    if (dataAuthor.length > 0) {
                        let nameAuthor = dataAuthor.reduce(
                            (result, element) => {
                                return result + ", " + element.Name;
                            },
                            ""
                        );
                        dataBook[index].NameAuthor = nameAuthor;
                    } else {
                        dataBook[index].NameAuthor = dataAuthor[0].Name;
                    }
                });
                console.log(dataBook);
                res.render("user/user_books", { data });
            }
        );
    }
}

module.exports = new BooksController();
