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
        let sampleFile;
        let uploadPath;
        console.log(req.files);
        // console.log(Object.keys(req.files).length);
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send("No files were uploaded.");
        }

        sampleFile = req.files.sampleFile;
        console.log(sampleFile);
        // res.send("Send successful!..");
    }
}

module.exports = new AuthorsController();
