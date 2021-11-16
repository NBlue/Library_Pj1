class SiteController {
    // GET /admin/books
    index(req, res) {
        res.render("admin_books");
    }

    // GET /search
    search(req, res) {
        res.send("NEWS SEARCH...............");
    }
}

module.exports = new SiteController();
