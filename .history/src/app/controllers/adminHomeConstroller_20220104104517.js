const Books = require("../models/adminBooksModels");
const modelBooks = new Books();

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
            console.log(dataLitterBook);

            var dataLotsBook = await modelBooks.statisticBook("DESC", "");
            console.log(dataLotsBook);

            res.render("admin/admin_home", {
                dataType,
                dataLitterBook,
                dataLotsBook,
            });
        }
        statistic();
    }
}

module.exports = new HomeStatisticController();
