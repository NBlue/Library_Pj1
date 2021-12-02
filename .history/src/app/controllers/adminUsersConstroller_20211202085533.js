const Users = require("../models/adminUsersModels");
const modelUsers = new Users();

class UsersController {
    // GET /admin/users
    getList(req, res) {
        modelUsers.getUserAll(function (err, data) {
            var contextManager = req.session.context;
            res.renderPjax("admin/admin_users", { data, contextManager });
        });
    }
}
module.exports = new UsersController();
