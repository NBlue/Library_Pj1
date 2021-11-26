const site = require("../models/siteModels");
const modelSite = new site();

const CheckValidation = require("../../checkValidation");
const checkValidation = new CheckValidation();

class SiteController {
    // GET /site/register_login - home mặc định
    getHome(req, res) {
        res.render("site/register_login");
    }

    checkAdmin(req, res) {
        modelSite.checkAccAdmin(req.body, function (err, data) {
            if (data != null) {
                res.redirect("/admin/books");
            } else {
                // cái này để xử lí ko phải tài khoản
                res.send("Không phải tài khoản admin!");
            }
        });
    }

    // GET /search
    search(req, res) {
        res.send("NEWS SEARCH...............");
    }
}

module.exports = new SiteController();