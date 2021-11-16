var Books = require("../models/booksModels");
var modelBooks = new Books();

class BooksController {
    // GET /admin/books
    index(req, res) {
        res.render("admin_books");
    }

    // GET /admin/books/:slug
    detail(req, res) {
        res.send("NEWS DETAIL");
    }

    getList(req, res) {
        modelBooks.getBookAll(function (err, data) {
            res.send({ result: data, error: err });
        });
    }

    getById(req, res) {
        modelBooks.getBookDetail(req.params.id, function (err, data) {
            res.send({ result: data, error: err });
        });
    }

    addNew(req, res) {
        modelBooks.addBook(req.body, function (err, data) {
            res.send({ result: data, error: err });
        });
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
