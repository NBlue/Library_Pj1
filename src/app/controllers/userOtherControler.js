class UserController {
    getInfo(req, res) {
        res.render("user/accout");
    }
}
module.exports = new UserController();
