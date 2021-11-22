const { conn, sql } = require("../../config/connectSQL");
module.exports = function () {
    this.getAuthorAll = async function (result) {
        var pool = await conn;
        var sqlString = "SELECT * FROM Authors";
        return await pool.request().query(sqlString, function (err, data) {
            if (data.recordset.length > 0) {
                result(null, data.recordset);
            } else {
                result(true, null);
            }
        });
    };
};
