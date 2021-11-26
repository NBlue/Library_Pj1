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
