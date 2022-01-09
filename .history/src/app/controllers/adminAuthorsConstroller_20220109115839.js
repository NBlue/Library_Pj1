const fs = require("fs"); //modul  cho phép tương tác với hệ thống tệp -> xóa ảnh
const Authors = require("../models/adminAuthorsModels");
const modelAuthors = new Authors();
const Write = require("../models/WriteModel");
const modelWrite = new Write();
const { check, validationResult } = require("express-validator");

var idPUT;
var linkFileOlder; // link img cũ

class AuthorsController {
    // GET /admin/authors
    getList(req, res) {
        modelAuthors.getAuthorAll(function (err, data) {
            res.render("admin/admin_authors", { data });
        });
    }

    // GET /admin/author/add
    getAdd(req, res) {
        res.render("admin/addAuthor");
    }

    // POST /admin/author/add
    addNew(req, res) {
        const errors = validationResult(req);
        const body = req.body;
        const errMess = {};
        if (
            !errors.isEmpty() ||
            !req.files ||
            Object.keys(req.files).length === 0
        ) {
            const alert = errors.array();
            alert.forEach((alert) => {
                errMess[alert.param] = alert.msg;
            });
            if (!req.files || Object.keys(req.files).length === 0) {
                errMess.imageAuthor = "Yêu cầu ảnh tác giả!";
            } else {
                errMess.imageAuthor = "Thêm lại ảnh tác giả!";
            }
            console.log(body);
            //res.json(errMess);
            res.render("admin/addAuthor", { errMess, body });
        } else {
            let imgAuthor;
            let uploadPath;
            imgAuthor = req.files.imgAuthor;
            uploadPath =
                __dirname.replace(
                    "app\\controllers",
                    "resources\\public\\img\\authors\\"
                ) + imgAuthor.name;
            console.log(imgAuthor);
            console.log(uploadPath);
            // console.log(req.body);

            // Use mv() to place file on the server
            imgAuthor.mv(uploadPath, function (err) {
                if (err) return res.status(500).send(err);
                let authorData = {
                    Name: req.body.author__name,
                    ImgAuthor: imgAuthor.name,
                };
                modelAuthors.addAuthor(authorData, function (err, data) {
                    res.redirect("/admin/authors"); //Khi thêm xong quay lại trang trước
                });
            });
        }
    }

    // GET /admin/author/update/:id
    getUpdate(req, res) {
        idPUT = req.params.id;
        modelAuthors.findById(req.params.id, function (err, data) {
            linkFileOlder = data.ImgAuthor;
            console.log({ data });
            res.render("admin/updateAuthor", { data });
        });
    }

    // PUT /admin/author/update/:id
    update(req, res) {
        const errors = validationResult(req, res);
        const data = req.body;
        data.ImgAuthor = linkFileOlder;
        data.IdAuthor = idPUT;
        const errMess = {};

        if (!errors.isEmpty()) {
            const alert = errors.array();
            alert.forEach((alert) => {
                errMess[alert.param] = alert.msg;
            });
            console.log(errMess);
            res.render("admin/updateAuthor", { errMess, data });
        } else {
            //Nếu ko thay đổi ảnh
            if (!req.files || Object.keys(req.files).length === 0) {
                let authorData = {
                    IdAuthor: req.params.id,
                    Name: req.body.author__name,
                    ImgAuthor: linkFileOlder,
                };
                modelAuthors.updateAuthor(authorData, function (err, data) {
                    res.redirect("/admin/authors");
                });
            } else {
                let imgAuthor = req.files.imgAuthor;
                let uploadPath = __dirname.replace(
                    "app\\controllers",
                    "resources\\public\\img\\authors\\" + imgAuthor.name
                );
                let authorData = {
                    IdAuthor: req.params.id,
                    Name: req.body.author__name,
                    ImgAuthor: imgAuthor.name,
                };
                // Xóa ảnh cũ ở forder
                try {
                    fs.unlinkSync(
                        __dirname.replace(
                            "app\\controllers",
                            "resources\\public\\img\\authors\\"
                        ) + linkFileOlder
                    );
                } catch (e) {
                    res.status(400).send("Error deleting image!");
                }
                // Cập nhật ảnh mới vào forder và server
                imgAuthor.mv(uploadPath, function (err) {
                    if (err) return res.status(500).send(err);
                    modelAuthors.updateAuthor(authorData, function (err, data) {
                        res.redirect("/admin/authors");
                    });
                });
            }
        }
    }

    // DELETE /admin/authors/:id
    delete(req, res) {
        modelWrite.findByIdAuthor(req.params.id, (err, data) => {
            //res.json(data);
            if (data === null) {
                // Tìm trong server lấy tên ảnh -> xóa file trong folder
                modelAuthors.findById(req.params.id, function (err, data) {
                    try {
                        fs.unlinkSync(
                            __dirname.replace(
                                "app\\controllers",
                                "resources\\public\\img\\authors\\"
                            ) + data.ImgAuthor
                        );
                    } catch (e) {
                        res.status(400).send("Error deleting image!");
                    }
                });
                // Xóa database
                modelAuthors.deleteAuthor(req.params.id, function (err, data) {
                    res.redirect("back");
                });
            } else {
                var alert = {
                    Title: "Không thể xóa",
                    Content:
                        "Đang có sách của tác giả trong hệ thống. Cần xóa sách của tác giả trước!",
                };
                res.redirect("back");
                // modelAuthors.getAuthorAll(function (err, data) {
                //     res.render("admin/admin_authors", { data, alert });
                // });
            }
        });
    }
}

module.exports = new AuthorsController();
