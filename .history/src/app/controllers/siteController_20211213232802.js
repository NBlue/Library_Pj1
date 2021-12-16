const site = require("../models/siteModels");
const modelSite = new site();
const Books = require("../models/adminBooksModels");
const modelBooks = new Books();
const Author = require("../models/adminAuthorsModels");
const modelAuthors = new Author();

const { check, validationResult } = require("express-validator");

class SiteController {
    // GET /site/register_login - home mặc định
    getHome(req, res) {
        var context = req.session.context;
        modelBooks.getTopPopularByQuantity((err, bookPopular) => {
            modelAuthors.getTopAuthor((err, topAuthor) => {
                console.log(topAuthor);
                res.render("user/user_home", {
                    context,
                    bookPopular,
                    topAuthor,
                });
            });
        });
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
                    req.session.context = data;
                    res.redirect("/admin/books");
                } else {
                    modelSite.checkAccUser(req.body, function (err, data) {
                        if (data != null) {
                            req.session.context = data;
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
            res.render("site/register", { errMess, body });
        } else {
            modelSite.addAccUser(req.body, function (err, data) {
                renderAcc(data);
            });
            function renderAcc(data) {
                modelSite.getUserByUsername(
                    data.username,
                    function (err, data) {
                        if (data != null) {
                            req.session.context = data;
                            res.redirect("/");
                        }
                    }
                );
            }
        }
    }

    // check username đã tồn tại khi đăng kí tài khoản
    findUserByUsername(input) {
        return modelSite.checkUserByUsername(input);
    }

    // GET /search
    search(req, res) {
        res.send("NEWS SEARCH...............");
    }

    // Accout
    getInfo(req, res) {
        var context = req.session.context;
        modelSite.getAccUserById(req.params.id, (err, dataUser) => {
            res.render("user/accout", { context, dataUser });
        });
    }

    updateInfo(req, res) {
        const errors = validationResult(req);
        const dataUser = req.body;
        const errMess = {};
        if (!errors.isEmpty()) {
            // Các lỗi cho vào 1 object
            const alerts = errors.array();
            alerts.forEach((alert) => {
                errMess[alert.param] = alert.msg;
            });

            for (let element in dataUser) {
                if (errMess[element] != null) delete dataUser[element];
            }
            console.log(errMess);
            console.log(dataUser);
            res.render("user/accout", { dataUser, errMess });
        } else {
        }
    }
}

module.exports = new SiteController();
