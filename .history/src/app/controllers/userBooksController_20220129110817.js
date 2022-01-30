const Books = require("../models/adminBooksModels");
const modelBooks = new Books();
const Author = require("../models/adminAuthorsModels");
const modelAuthors = new Author();
const site = require("../models/siteModels");
const modelSite = new site();

class BooksController {
    getBookKhcn(req, res) {
        var context = req.session.context;
        let IdBorrow = getIdBorrow();
        modelBooks.findBookByTypeBook(
            "Khoa học công nghệ - Kinh tế",
            (err, data) => {
                res.render("user/user_books", { context, data, IdBorrow });
            }
        );
    }
    getBookVhnt(req, res) {
        var context = req.session.context;
        modelBooks.findBookByTypeBook("Văn học nghệ thuật", (err, data) => {
            res.render("user/user_books", { context, data });
        });
    }
    getBookVhxh(req, res) {
        var context = req.session.context;
        modelBooks.findBookByTypeBook(
            "Văn hóa xã hội - Lịch sử",
            (err, data) => {
                res.render("user/user_books", { context, data });
            }
        );
    }
    getBookGt(req, res) {
        var context = req.session.context;
        modelBooks.findBookByTypeBook("Giáo trình", (err, data) => {
            res.render("user/user_books", { context, data });
        });
    }
    getBookTt(req, res) {
        var context = req.session.context;
        let IdBorrow = getIdBorrow(context);
        console.log("IdBorrow:" + IdBorrow);
        modelBooks.findBookByTypeBook("Truyện, tiểu thuyết", (err, data) => {
            res.render("user/user_books", { context, data, IdBorrow });
        });
    }
    getBookTltg(req, res) {
        var context = req.session.context;
        modelBooks.findBookByTypeBook(
            "Tâm lý, tâm linh, tôn giáo",
            (err, data) => {
                res.render("user/user_books", { context, data });
            }
        );
    }
    getBookStn(req, res) {
        var context = req.session.context;
        modelBooks.findBookByTypeBook("Sách thiếu nhi", (err, data) => {
            res.render("user/user_books", { context, data });
        });
    }

    //Book Details
    getBookDetail(req, res) {
        var context = req.session.context;
        modelBooks.getBookDetail(req.params.id, async (err, data) => {
            let authors = await modelAuthors.findByIdBook(data.IdBook);
            let nameAuthor = "";
            if (authors.length === 1) {
                nameAuthor += authors[0].Name;
            } else {
                for (let i = 0; i < authors.length; i++) {
                    nameAuthor += authors[i].Name;
                    if (i !== authors.length - 1) nameAuthor += ", ";
                }
            }
            data.NameAuthor = nameAuthor;
            console.log(data);
            res.render("user/detail_book", { context, data });
        });
    }
}

async function getIdBorrow(context) {
    let BorrowingBook = await modelSite.getBookBorrowing(context.IdUser);
    let IdString = "";
    for (let e of BorrowingBook) {
        console.log(e);
        IdString += e.IdBook + ",";
    }
    console.log(IdString);
    return IdString;
}

module.exports = new BooksController();
