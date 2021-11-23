const Users = require("../models/adminUsersModels");
const modelUsers = new Users();

class UsersController {
    // GET /admin/users
    getList(req, res) {
        modelUsers.getUserAll(function (err, data) {
            res.render("admin/admin_users", { data });
        });
    }
}
module.exports = UsersController;
