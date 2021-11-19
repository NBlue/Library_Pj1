const Authors = require("../models/authorsModels");
const modelAuthors = new Authors();

class AuthorsController {
    // GET /admin/authors
    getList(req, res) {
        res.render("admin/admin_authors");
    }
}

module.exports = new AuthorsController();
