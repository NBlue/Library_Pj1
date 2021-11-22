class SiteController {
    // GET /site/register_login - home mặc định
    gethome(req, res) {
        res.render("site/register_login");
    }

    // GET /search
    search(req, res) {
        res.send("NEWS SEARCH...............");
    }
}

module.exports = new SiteController();
