const fs = require("fs"); //modul  cho phép tương tác với hệ thống tệp -> xóa ảnh
var linkFileOlder; // link img cũ
const Authors = require("../models/adminAuthorsModels");
const modelAuthors = new Authors();

class AuthorsController {
    // GET /admin/authors
    getList(req, res) {
        modelAuthors.getAuthorAll(function (err, data) {
            var context = req.session.context;
            var test = { context };
            res.render("admin/admin_authors", { data, test });
        });
    }

    // GET /admin/author/add
    getAdd(req, res) {
        res.render("admin/addAuthor");
    }

    // POST /admin/author/add
    addNew(req, res) {
        let imgAuthor;
        let uploadPath;
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send("No files were uploaded.");
        }
        // name of the input is imgAuthorfile
        // "D:\\Dev\\NodeJS-Express\\LibraryBook\\src\\resources\\public\\img\\authors\\" + imgAuthor.name;
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

    // GET /admin/author/update/:id
    getUpdate(req, res) {
        modelAuthors.findById(req.params.id, function (err, data) {
            linkFileOlder = data.ImgAuthor;
            console.log({ data });
            res.render("admin/updateAuthor", { data });
        });
    }

    // PUT /admin/author/update/:id
    update(req, res) {
        // Nếu ko thay đổi ảnh
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

    // DELETE /admin/authors/:id
    delete(req, res) {
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
    }
}

module.exports = new AuthorsController();