const site = require("../models/siteModels");
const modelSite = new site();

const { check, validationResult } = require("express-validator");

class SiteController {
    // GET /site/register_login - home mặc định
    getHome(req, res) {
        res.render("site/register_login");
    }

    checkAdmin(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const alert = errors.array();
            console.log(errors);
            console.log(alert[0].msg);
            console.log(alert[1].msg);
            res.render("site/register_login", { alert });
        }
        // modelSite.checkAccAdmin(req.body, function (err, data) {
        //     if (data != null) {
        //         res.redirect("/admin/books");
        //     } else {
        //         // cái này để xử lí ko phải tài khoản
        //         res.send("Không phải tài khoản admin!");
        //     }
        // });
    }

    // GET /search
    search(req, res) {
        res.send("NEWS SEARCH...............");
    }
}

module.exports = new SiteController();
