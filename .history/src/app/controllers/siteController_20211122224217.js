class SiteController {
    // GET /site/register_login - home mặc định
    getHome(req, res) {
        res.render("site/register_login");
    }

    checkAdmin(req, res) {
        res.send("Đang check tài khoản");
    }

    // GET /search
    search(req, res) {
        res.send("NEWS SEARCH...............");
    }
}

module.exports = new SiteController();
