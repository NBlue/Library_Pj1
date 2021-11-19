const Books = require("../models/booksModels");
const modelBooks = new Books();

class BooksController {
    // GET /admin/books
    getList(req, res) {
        modelBooks.getBookAll(function (err, data) {
            // res.send({ result: data, error: err });
            res.render("admin_books", { data });
        });
    }

    getById(req, res) {
        modelBooks.getBookDetail(req.params.id, function (err, data) {
            res.send({ result: data, error: err });
        });
    }

    // GET /admin/books/create   - hiện form thêm sách
    getCreatBook(req, res) {
        res.render("admin/addBook");
    }

    addNew(req, res) {
        res.send("Send success");
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
