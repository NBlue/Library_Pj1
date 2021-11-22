// const Authors = require("../models/authorsModels");
// const modelAuthors = new Authors();

class AuthorsController {
    // GET /admin/authors
    getList(req, res) {
        res.render("admin/admin_authors");
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
        uploadPath =
            "D:\\Dev\\NodeJS-Express\\LibraryBook\\src\\resources\\public\\img\\authors\\" +
            imgAuthor.name;
        console.log(imgAuthor);
        console.log(uploadPath);

        const customText = document.querySelector(".imgAuthor");
        const realFileBtn = document.querySelector("#imgAuthor");
        realFileBtn.addEventListener("change", function () {
            if (realFileBtn.value) {
                customText.innerHTML = imgAuthor.name;
            } else {
                customText.innerHTML = "Thêm ảnh cho tác giả";
            }
        });
        // Use mv() to place file on the server
        imgAuthor.mv(uploadPath, function (err) {
            if (err) return res.status(500).send(err);
            res.send("Img uploaded");
        });
    }
}

module.exports = new AuthorsController();
