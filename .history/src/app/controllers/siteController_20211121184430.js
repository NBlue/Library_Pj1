class SiteController {
    // GET /admin/books
    index(req, res) {
        res.render("site/register_login");
    }

    // GET /search
    search(req, res) {
        res.send("NEWS SEARCH...............");
    }
}

module.exports = new SiteController();
