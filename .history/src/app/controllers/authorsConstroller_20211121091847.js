const Authors = require("../models/authorsModels");
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
        res.render("admin/addBook");
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
        uploadPath = __dirname;
        console.log(uploadPath);
        uploadPath =
            "D:\\Dev\\NodeJS-Express\\LibraryBook\\src\\resources\\public\\img\\authors\\" +
            imgAuthor.name;
        console.log(imgAuthor);
        console.log(uploadPath);
        console.log(req.body);

        // Use mv() to place file on the server
        imgAuthor.mv(uploadPath, function (err) {
            if (err) return res.status(500).send(err);
            res.send("Img uploaded");
        });

        var authorData = {
            Name: req.body.author__name,
            ImgAuthor: imgAuthor.name,
        };
        console.log(authorData);

        modelAuthors.addAuthor(authorData, function (err, data) {
            res.send({ result: data, error: err });
        });
    }
}

module.exports = new AuthorsController();
