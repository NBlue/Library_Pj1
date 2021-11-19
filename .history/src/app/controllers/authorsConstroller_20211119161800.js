// const Authors = require("../models/authorsModels");
// const modelAuthors = new Authors();

class AuthorsController {
    // GET /admin/authors
    getList(req, res) {
        res.render("admin/admin_authors");
    }

    // GET /admin/add
    getAdd(req, res) {
        res.render("admin/addBook");
    }
}

module.exports = new AuthorsController();
