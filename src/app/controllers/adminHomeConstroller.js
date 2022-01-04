const Books = require("../models/adminBooksModels");
const modelBooks = new Books();
const User = require("../models/adminUsersModels");
const modelUsers = new User();

class HomeStatisticController {
    statisticHome(req, res) {
        async function statistic() {
            var dataTypebook = await modelBooks.statisticTypebook();
            var dataType = {},
                dataTypeNum = [];
            for (let e of dataTypebook) {
                dataTypeNum.push(e.Number);
            }
            dataType.dataTypeNum = dataTypeNum;

            var dataLitterBook = await modelBooks.statisticBook(
                "ASC",
                "WHERE Quantity <= 10"
            );
            var dataLotsBook = await modelBooks.statisticBook("DESC", "");

            var userLock = await modelUsers.getUserLocking();
            var userWarn = await modelUsers.getUserWaring();

            res.render("admin/admin_home", {
                dataType,
                dataLitterBook,
                dataLotsBook,
                userLock,
                userWarn,
            });
        }
        statistic();
    }
}

module.exports = new HomeStatisticController();
