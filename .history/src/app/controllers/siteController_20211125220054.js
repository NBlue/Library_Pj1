const site = require("../models/siteModels");
const modelSite = new site();

const { check, validationResult } = require("express-validator");

class SiteController {
    // GET /site/register_login - home mặc định
    getHome(req, res) {
        res.render("user/user_home");
    }

    getLogin(req, res) {
        res.render("site/login");
    }

    checkAdmin(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const alerts = errors.array();
            const body = req.body;
            const errMess = {};
            alerts.forEach((alert) => {
                errMess[alert.param] = alert.msg;
            });
            for (let element in body) {
                if (errMess[element] != null) console.log(element);
            }
            console.log(errMess);
            res.render("site/login", { errMess, body });
        } else {
            modelSite.checkAccAdmin(req.body, function (err, data) {
                if (data != null) {
                    res.redirect("/admin/books");
                } else {
                    modelSite.checkAccUser(req.body, function (err, data) {
                        if (data != null) {
                            res.redirect("/");
                        } else {
                            // alert("Tài khoản hoặc mật khẩu bị sai!");
                            res.redirect("back");
                        }
                    });
                }
            });
        }
    }

    // register
    getRegister(req, res) {
        res.render("site/register");
    }

    addAccUser(req, res) {
        res.json(req.body);
    }

    // GET /search
    search(req, res) {
        res.send("NEWS SEARCH...............");
    }
}

module.exports = new SiteController();
