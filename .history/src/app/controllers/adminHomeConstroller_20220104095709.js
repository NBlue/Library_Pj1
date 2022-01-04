const Books = require("../models/adminBooksModels");
const modelBooks = new Books();

class HomeStatisticController {
    statisticHome(req, res) {
        async function statistic() {
            var dataTypebook = await modelBooks.statisticTypebook();
            var dataType = {},
                dataTypeName = [],
                dataTypeNum = [];
            for (let e of dataTypebook) {
                dataTypeName.push(e.TypeBook);
                dataTypeNum.push(e.Number);
            }
            dataType.dataTypeName = dataTypeName;
            dataType.dataTypeNum = dataTypeNum;
            console.log(dataType);
            res.render("admin/admin_home" { dataType});
        }
        statistic();
    }
}

module.exports = new HomeStatisticController();
