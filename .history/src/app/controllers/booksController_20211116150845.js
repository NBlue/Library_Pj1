class BooksController {
    // GET /admin/books
    index(req, res) {
        res.render("admin_books");
    }

    // GET /admin/books/:slug
    detail(req, res) {
        res.send("NEWS DETAIL");
    }
}

module.exports = new BooksController();
