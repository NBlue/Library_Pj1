const { conn, sql } = require("../../config/connectSQL");
module.exports = function () {
    this.getUserAll = async function (result) {
        var pool = await conn;
        var sqlString = "SELECT * FROM Users";
        return await pool.request().query(sqlString, function (err, data) {
            if (data.recordset.length > 0) {
                result(null, data.recordset);
            } else {
                result(true, null);
            }
        });
    };
};
