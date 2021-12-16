const Author = require("../models/adminAuthorsModels");
const modelAuthors = new Author();

class AuthorController {
    getAuthors(req, res) {
        modelAuthors.getAuthorAll((err, data) => {
            var context = req.session.context;
            res.render("user/user_authors", { data, context });
        });
    }

    getBookToAuthor(req, res) {
        res.json("Đây là sách của ông ấy!");
    }
}

module.exports = new AuthorController();
