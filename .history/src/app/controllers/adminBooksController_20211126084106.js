const fs = require("fs");
var linkFileOlder;
const Books = require("../models/adminBooksModels");
const modelBooks = new Books();

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
        res.render("admin/addBook");
    }

    addNew(req, res) {
        let imgBook;
        let uploadPath;
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(404).send("No files were uploaded.");
        }
        // imgBook = req.file.imgBook;
        // uploadPath =
        //     __dirname.replace(
        //         "app\\controllers",
        //         "resources\\public\\img\\books\\"
        //     ) + imgBook.name;
        console.log(req.file);
        console.log(uploadPath);
        res.json(req.body);
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
