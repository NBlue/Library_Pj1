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
        const body = req.body;
        const errMess = {};
        if (!errors.isEmpty()) {
            // Các lỗi cho vào 1 object
            const alerts = errors.array();
            alerts.forEach((alert) => {
                errMess[alert.param] = alert.msg;
            });
            // input nào có lỗi thì xóa value khỏi body => cho input hiện lại các giá trị hợp lệ
            for (let element in body) {
                if (errMess[element] != null) delete body[element];
            }
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
                            errMess.username = "Tài khoản đăng nhập chưa đúng!";
                            errMess.password = "Tài khoản đăng nhập chưa đúng!";
                            res.render("site/login", { errMess, body });
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
        const errors = validationResult(req);
        const body = req.body;
        const errMess = {};
        if (!errors.isEmpty()) {
            const alerts = errors.array();
            alerts.forEach((alert) => {
                errMess[alert.param] = alert.msg;
            });
            for (let element in body) {
                if (errMess[element] != null) delete body[element];
            }
            // console.log(errMess);
            // console.log(body);
            res.render("site/register", { errMess, body });
        } else {
            // res.json(req.body);
            modelSite.addAccUser(req.body, function (err, data) {
                modelSite.getDetailUserByUsername(
                    data.username,
                    function (err, data) {
                        res.render(
                            "user/user_home",
                            { data }
                            // function (err, html) {
                            //     res.redirect("/");
                            // }
                        );
                    }
                );
            });
        }
    }

    // GET /search
    search(req, res) {
        res.send("NEWS SEARCH...............");
    }
}

module.exports = new SiteController();
