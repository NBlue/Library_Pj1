const Author = require("../models/adminAuthorsModels");
const modelAuthors = new Author();
const Book = require("../models/adminBooksModels");
const modelBooks = new Book();

class AuthorController {
    getAuthors(req, res) {
        modelAuthors.getAuthorAll((err, data) => {
            var context = req.session.context;
            res.render("user/user_authors", { data, context });
        });
    }

    getBookToAuthor(req, res) {
        var context = req.session.context;
        modelBooks.findBooksById(req.params.id, (err, data) => {
            res.render("user/user_books", { data, context });
        });
    }
}

module.exports = new AuthorController();
