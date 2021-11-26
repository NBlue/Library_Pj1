const fs = require("fs");
var linkFileOlder;
const Books = require("../models/adminBooksModels");
const modelBooks = new Books();
const Authors = require("../models/adminAuthorsModels");
const modelAuthors = new Authors();

class BooksController {
    // GET /admin/books
    getList(req, res) {
        modelBooks.getBookAll(function (err, data) {
            // res.send({ result: data, error: err });
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
            res.render("admin/addBook", { data });
        });
    }

    addNew(req, res) {
        let imgBook;
        let uploadPath;
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(404).send("No files were uploaded.");
        }
        imgBook = req.files.imgBook;
        uploadPath =
            __dirname.replace(
                "app\\controllers",
                "resources\\public\\img\\books\\"
            ) + imgBook.name;
        imgBook.mv(uploadPath, function (err) {
            if (err) return res.status(500).send(err);
            console.log(req.params);
            console.log(req.body);
            res.json(req.body);
            let booksData = {
                Name: req.body.bookName,
                TypeBook: req.body.typeBook,
                Quantity: req.body.numberBook,
                Reivew: req.body.descriptions,
                ImgBook: imgBook.name,
                IdAuthor: req.params.id.split("_"),
            };
            console.log(booksData);
        });
        // modelBooks.addBook(req.body, function (err, data) {
        //     res.send({ result: data, error: err });
        // });
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
