const fs = require("fs"); //modul  cho phép tương tác với hệ thống tệp -> xóa ảnh

const Authors = require("../models/adminAuthorsModels");
const modelAuthors = new Authors();

class AuthorsController {
    // GET /admin/authors
    getList(req, res) {
        modelAuthors.getAuthorAll(function (err, data) {
            res.render("admin/admin_authors", { data });
        });
    }

    // GET /admin/add
    getAdd(req, res) {
        res.render("admin/addAuthor");
    }

    // POST /admin/add
    addNew(req, res) {
        let imgAuthor;
        let uploadPath;
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send("No files were uploaded.");
        }
        // name of the input is imgAuthorfile
        imgAuthor = req.files.imgAuthor;
        uploadPath =
            "D:\\Dev\\NodeJS-Express\\LibraryBook\\src\\resources\\public\\img\\authors\\" +
            imgAuthor.name;
        console.log(imgAuthor);
        console.log(uploadPath);
        // console.log(req.body);

        // Use mv() to place file on the server
        imgAuthor.mv(uploadPath, function (err) {
            if (err) return res.status(500).send(err);
            var authorData = {
                Name: req.body.author__name,
                ImgAuthor: imgAuthor.name,
            };
            modelAuthors.addAuthor(authorData, function (err, data) {
                res.redirect("/admin/authors"); //Khi thêm xong quay lại trang trước
            });
        });
    }

    // GET /admin/update/:id
    getUpdate(req, res) {
        modelAuthors.findById(req.params.id, function (err, data) {
            try {
                let linkFile = __dirname;
                linkFile.replace(
                    "controllers",
                    "resources\\public\\img\\authors\\"
                );
                console.log(__dirname.length);
                // fs.unlinkSync(`images/${req.params.folder}/${req.params.id}.png`);
                res.render("admin/updateAuthor", { data });
            } catch (err) {
                res.status(400).send({
                    message: "Error deleting image!",
                    error: e.toString(),
                    req: req.body,
                });
            }
        });
    }

    // PUT /admin/update/:id
    update(req, res) {
        let imgAuthor;
        let uploadPath;
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send("No files were uploaded.");
        }
        // name of the input is imgAuthorfile
        imgAuthor = req.files.imgAuthor;
        uploadPath =
            "D:\\Dev\\NodeJS-Express\\LibraryBook\\src\\resources\\public\\img\\authors\\" +
            imgAuthor.name;

        // Use mv() to place file on the server
        imgAuthor.mv(uploadPath, function (err) {
            if (err) return res.status(500).send(err);
            var authorData = {
                Name: req.body.author__name,
                ImgAuthor: imgAuthor.name,
            };
            modelAuthors.addAuthor(authorData, function (err, data) {
                // res.redirect("/admin/authors"); //Khi thêm xong quay lại trang trước
                res.json(authorData);
            });
        });
    }
}

module.exports = new AuthorsController();
