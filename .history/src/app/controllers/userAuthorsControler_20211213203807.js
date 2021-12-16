const Author = require("../models/adminAuthorsModels");
const modelAuthors = new Author();

class AuthorController {
    getAuthors(req, res) {
        modelAuthors.getAuthorAll((err, data) => {
            var context = req.session.context;
            res.render("user/user_cart_books", { data, context });
        });
    }
}

module.exports = new AuthorController();
