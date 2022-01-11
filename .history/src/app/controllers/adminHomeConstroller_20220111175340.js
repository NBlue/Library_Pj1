const Books = require("../models/adminBooksModels");
const modelBooks = new Books();
const User = require("../models/adminUsersModels");
const modelUsers = new User();
const Site = require("../models/siteModels");
const modelSite = new Site();

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

    // Khóa tài khoản
    LockAccout(req, res) {
        modelUsers.getInfoById(async (err, data) => {
            let Lock = await modelSite.updateLockStatus(
                req.params.id,
                dateNow,
                data.LockNumber
            );
        });
        async function lockAcc() {
            var today = new Date();
            var dateNow = today.toISOString().substr(0, 10);
            let dataUser = await modelUsers.getInfoById(req.params.id);
            console.log(dataUser);
            console.log(dateNow);
            let Lock = await modelSite.updateLockStatus(
                req.params.id,
                dateNow,
                dataUser.LockNumber
            );
            res.redirect("/admin/home");
        }
        lockAcc();
    }

    // Cập nhật lại điểm cho người dùng sắp bị khóa nếu người dùng đến thư viện trả sách cho quản lí
    updateScore(req, res) {
        async function updateScore100() {
            //110 vì bên controler trừ đi là còn 100
            let update100 = await modelSite.updateScoreUser(req.params.id, 110);
            res.redirect("/admin/home");
        }
        updateScore100();
    }

    // Mở khóa tài khoản
    openLockUser(req, res) {
        async function updateLock() {
            var update = await modelUsers.updateLockStatus(req.params.id);
            res.redirect("/admin/home");
        }
        updateLock();
    }
}

module.exports = new HomeStatisticController();
