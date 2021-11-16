class BooksController {
    // GET /admin/books
    index(req, res) {
        res.render("admin_books");
    }
}

module.exports = new BooksController();
