const Books = require("../models/adminBooksModels");
const modelBooks = new Books();

class HomeStatisticController {
    statisticHome(req, res) {
        async function statistic() {
            var data = await modelBooks.statisticTypebook();
            console.log("Data:");
            console.log(data);
            res.render("admin/admin_home");
        }
        statistic();
    }
}

module.exports = new HomeStatisticController();
