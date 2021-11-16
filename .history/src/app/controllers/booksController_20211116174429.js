const Books = require("../models/booksModels");
const modelBooks = new Books();

const {
    multipDataSqlToObject,
    dataSqlToObject,
} = require("../../util/dataSql");
class BooksController {
    // GET /admin/books
    index(req, res) {
        res.render("admin_books");
    }

    getList(req, res) {
        modelBooks.getBookAll(function (err, data) {
            // res.send({ result: data, error: err });
            console.table(data);
            res.render("admin_books", {
                // data: multipDataSqlToObject(data),
            });
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
