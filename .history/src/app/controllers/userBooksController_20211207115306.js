const Books = require("../models/adminBooksModels");
const modelBooks = new Books();
const Author = require("../models/adminAuthorsModels");
const modelAuthors = new Author();

class BooksController {
    getBookKhcn(req, res) {
        modelBooks.findBookByTypeBook(
            "Khoa học công nghệ - Kinh tế",
            (err, data) => {
                // var data = dataBook;
                // async function getData() {
                //     await dataBook.forEach(async (element, index) => {
                //         var dataAuthor = await modelAuthors.findByIdBook(
                //             element.IdBook
                //         );
                //         if (dataAuthor.length > 1) {
                //             let nameAuthor = dataAuthor.reduce(
                //                 (result, element, index) => {
                //                     return result + element.Name + ", ";
                //                 },
                //                 ""
                //             );
                //             data[index].NameAuthor = nameAuthor;
                //             console.log(data[index]);
                //         } else {
                //             data[index].NameAuthor = dataAuthor[0].Name;
                //             console.log(data[index]);
                //         }
                //     });
                // }
                // getData();
                // console.log("Data day nay:");
                // console.log(data);
                res.render("user/user_books", { data });
            }
        );
    }
    getBookVhnt(req, res) {
        modelBooks.findBookByTypeBook("Văn học nghệ thuật", (err, data) => {
            res.render("user/user_books", { data });
        });
    }
    getBookVhxh(req, res) {
        modelBooks.findBookByTypeBook(
            "Văn hóa xã hội - Lịch sử",
            (err, data) => {
                res.render("user/user_books", { data });
            }
        );
    }
    getBookGt(req, res) {
        modelBooks.findBookByTypeBook("Giáo trình", (err, data) => {
            res.render("user/user_books", { data });
        });
    }
    getBookTt(req, res) {
        modelBooks.findBookByTypeBook("Truyện, tiểu thuyết", (err, data) => {
            res.render("user/user_books", { data });
        });
    }
    getBookTltg(req, res) {
        modelBooks.findBookByTypeBook(
            "Tâm lý, tâm linh, tôn giáo",
            (err, data) => {
                res.render("user/user_books", { data });
            }
        );
    }
    getBookStn(req, res) {
        modelBooks.findBookByTypeBook("Sách thiếu nhi", (err, data) => {
            res.render("user/user_books", { data });
        });
    }
}

module.exports = new BooksController();
