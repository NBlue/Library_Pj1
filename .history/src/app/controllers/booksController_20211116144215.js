class BooksController {
    // GET
    index(req, res) {
        res.render("admin_books");
    }
}

module.exports = new BooksController();
