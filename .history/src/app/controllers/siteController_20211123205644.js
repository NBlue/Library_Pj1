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
            const alerts = errors.array();
            const errMess = {};
            alerts.forEach((alert) => {
                errMess[alert.param] = alert.msg;
            });
            res.render("site/register_login", { errMess });
        } else {
            modelSite.checkAccAdmin(req.body, function (err, data) {
                if (data != null) {
                    res.redirect("/admin/books");
                } else {
                    modelSite.checkAccUser(req.body, function (err, data) {
                        if (data != null) {
                            res.redirect("/user/home");
                        } else {
                            alert("Tài khoản hoặc mật khẩu bị sai!");
                            res.redirect("back");
                        }
                    });
                }
            });
        }
    }

    // GET /search
    search(req, res) {
        res.send("NEWS SEARCH...............");
    }
}

module.exports = new SiteController();
