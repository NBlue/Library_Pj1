const fs = require("fs");
var linkFileOlder;
const Books = require("../models/adminBooksModels");
const modelBooks = new Books();
const Authors = require("../models/adminAuthorsModels");
const modelAuthors = new Authors();
const { check, validationResult } = require("express-validator");

class BooksController {
    // GET /admin/books
    getList(req, res) {
        modelBooks.getBookAll(function (err, data) {
            var contextManager = req.session.context;
            console.log(contextManager);
            res.render("admin/admin_books", { data, contextManager });
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

    addNew(req, res) {
        const errors = validationResult(req, res);
        const body = req.body;
        const errMess = {};
        if (!errors.isEmpty()) {
            const alerts = errors.array();
            alerts.forEach((alert) => {
                errMess[alert.param] = alert.msg;
            });
            if (!req.files || Object.keys(req.files).length === 0)
                errMess.imageBook = "Yêu cầu thêm ảnh sách!";
            console.log(req.params);
            if (req.params.id === undefined)
                errMess.authorBook = "Yêu cầu thêm tác giả cho sách!";
            console.log(errMess);
            res.render("admin/addBook", { errMess });
        } else {
            let imgBook;
            let uploadPath;

            imgBook = req.files.imgBook;
            uploadPath =
                __dirname.replace(
                    "app\\controllers",
                    "resources\\public\\img\\books\\"
                ) + imgBook.name;

            imgBook.mv(uploadPath, function (err) {
                if (err) return res.status(500).send(err);

                let booksData = {
                    Name: req.body.bookName,
                    TypeBook: req.body.typeBook,
                    Quantity: req.body.numberBook,
                    Review: req.body.description,
                    ImgBook: imgBook.name,
                    IdAuthor: req.params.id.split("_"),
                };
                var idBook;
                modelBooks.addBook(booksData, function (err, data) {});
                modelBooks.findBookByName(booksData.Name, function (err, data) {
                    console.log(data); //???
                    idBook = data.IdBook;

                    for (let element of booksData.IdAuthor) {
                        if (Number(element) !== 0) {
                            let obData = {};
                            obData.IdBook = idBook;
                            obData.IdAuthor = Number(element);
                            console.log(obData);
                            modelBooks.addWrite(
                                obData,
                                function (err, data) {}
                            );
                        }
                    }
                    res.redirect("/admin/books");
                });
            });
        }
    }
    update(req, res) {
        modelBooks.updateBook(req.body, function (err, data) {
            res.send({ result: data, error: err });
        });
    }
    delete(req, res) {
        modelBooks.deleteBook(req.params.id, function (err, data) {
            res.send({ result: data, error: err });
        });
    }
}

module.exports = new BooksController();
