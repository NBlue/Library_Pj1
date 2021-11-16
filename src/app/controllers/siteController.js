class SiteController {
    // GET /admin/books
    index(req, res) {
        res.render("user_home");
    }

    // GET /search
    search(req, res) {
        res.send("NEWS SEARCH...............");
    }
}

module.exports = new SiteController();
