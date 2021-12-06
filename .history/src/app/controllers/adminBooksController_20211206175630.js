const fs = require("fs");
const Books = require("../models/adminBooksModels");
const modelBooks = new Books();
const Authors = require("../models/adminAuthorsModels");
const modelAuthors = new Authors();
const Write = require("../models/WriteModel");
const modelWrite = new Write();
const { check, validationResult } = require("express-validator");

var idPUT;
var linkFileOlder;

class BooksController {
    // GET /admin/books
    getList(req, res) {
        modelBooks.getBookAll(function (err, data) {
            //res.send(data);
            res.render("admin/admin_books", { data });
        });
    }

    getById(req, res) {
        modelBooks.getBookDetail(req.params.id, function (err, data) {
            res.send({ result: data, error: err });
        });
    }

    // GET /admin/books/add - hiện form thêm sách
    getAddBook(req, res) {
        modelAuthors.getAuthorAll(function (err, data) {
            var context = req.session.context;
            res.render("admin/addBook", { data, context });
        });
    }

    // POST /admin/books/add thêm sách mới
    addNew(req, res) {
        const errors = validationResult(req, res);
        const body = req.body;
        const errMess = {};
        var IdAuthors = [];

        for (let key in req.body) {
            if (key === req.body[key]) {
                IdAuthors.push(key);
            }
        }

        if (!errors.isEmpty()) {
            const alerts = errors.array();
            alerts.forEach((alert) => {
                errMess[alert.param] = alert.msg;
            });
            if (!req.files || Object.keys(req.files).length === 0)
                errMess.imageBook = "Yêu cầu thêm ảnh sách!";
            else errMess.imageBook = "Nhập lại ảnh sách!";

            if (IdAuthors.length === 0)
                errMess.authorBook = "Yêu cầu thêm tác giả cho sách!";
            else body.IdAuthor = IdAuthors;
            console.log(body);

            modelAuthors.getAuthorAll(function (err, data) {
                var context = req.session.context;
                res.render("admin/addBook", { data, errMess, body, context });
            });
        } else {
            let imgBook;
            let uploadPath;

            imgBook = req.files.imgBook;
            uploadPath =
                __dirname.replace(
                    "app\\controllers",
                    "resources\\public\\img\\books\\"
                ) + imgBook.name;

            let booksData = {
                Name: req.body.bookName,
                TypeBook: req.body.typeBook,
                Quantity: req.body.numberBook,
                Review: req.body.description,
                ImgBook: imgBook.name,
            };

            imgBook.mv(uploadPath, function (err) {
                if (err) return res.status(500).send(err);
                var idBook;
                modelBooks.addBook(booksData, function (err, data) {
                    modelBooks.findBookByName(
                        booksData.Name,
                        function (err, data) {
                            //console.log(data); //???
                            idBook = data.IdBook;
                            for (let element of IdAuthors) {
                                let obData = {};
                                obData.IdBook = idBook;
                                obData.IdAuthor = Number(element);
                                console.log(obData);
                                modelWrite.addWrite(
                                    obData,
                                    function (err, data) {}
                                );
                            }
                            res.redirect("/admin/books");
                        }
                    );
                });
            });
        }
    }

    getUpdate(req, res) {
        idPUT = req.params.id;
        modelWrite.findByIdBook(req.params.id, function (err, data) {
            var IdAuthors = [];
            for (var element of data) {
                IdAuthors.push(element.IdAuthor);
            }
            modelBooks.getBookDetail(req.params.id, function (err, data) {
                linkFileOlder = data.ImgBook;
                var body = data;
                body.IdAuthor = IdAuthors;
                console.log(body);
                modelAuthors.getAuthorAll(function (err, data) {
                    res.render("admin/updateBook", { body, data });
                });
            });
        });
    }

    // PUT /admin/books/update/1
    update(req, res) {
        const errors = validationResult(req, res);
        const body = req.body;
        body.IdBook = idPUT;
        body.ImgBook = linkFileOlder;
        const errMess = {};
        var IdAuthors = [];

        // console.log("ID PUT: " + idPUT);
        console.log(body);

        for (let key in req.body) {
            if (key === req.body[key]) {
                IdAuthors.push(key);
            }
        }
        if (!errors.isEmpty()) {
            const alerts = errors.array();
            alerts.forEach((alert) => {
                errMess[alert.param] = alert.msg;
            });
            if (IdAuthors.length === 0)
                errMess.authorBook = "Yêu cầu thêm tác giả cho sách!";
            else body.IdAuthor = IdAuthors;
            modelAuthors.getAuthorAll(function (err, data) {
                var context = req.session.context;
                res.render("admin/updateBook", {
                    data,
                    errMess,
                    body,
                    context,
                });
            });
        } else {
            // if Trường hợp ảnh thay đổi else ảnh không đổi
            if (req.files || Object.keys(req.files).length > 0) {
                let imgBook = req.files.imgBook;
                let uploadPath = __dirname.replace(
                    "app\\controllers",
                    "resources\\public\\img\\books\\" + imgBook.name
                );
                let booksData = {
                    IdBook: req.params.id,
                    Name: req.body.Name,
                    TypeBook: req.body.TypeBook,
                    Quantity: req.body.Quantity,
                    Review: req.body.Review,
                    ImgBook: imgBook.name,
                };
                console.log(booksData);
                console.log(IdAuthors);
                try {
                    fs.unlinkSync(
                        __dirname.replace(
                            "app\\controllers",
                            "resources\\public\\img\\books\\"
                        ) + linkFileOlder
                    );
                } catch (e) {
                    res.status(400).send("Error deleting image!");
                }
                imgBook.mv(uploadPath, function (err) {
                    if (err) return res.status(500).send(err);
                    modelBooks.updateBook(booksData, function (err, data) {
                        for (let element of IdAuthors) {
                            let obData = {};
                            obData.IdBook = idBook;
                            obData.IdAuthor = Number(element);
                            console.log(obData);
                            modelWrite.updateWrite(
                                obData,
                                function (err, data) {}
                            );
                        }
                        res.redirect("/admin/books");
                    });
                });
            } else {
            }
        }
    }
    delete(req, res) {
        modelBooks.deleteBook(req.params.id, function (err, data) {
            res.send({ result: data, error: err });
        });
    }
}

module.exports = new BooksController();
