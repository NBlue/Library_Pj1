const { conn, sql } = require("../../config/connectSQL");
module.exports = function () {
    this.checkAccAdmin = async function (checkData, result) {
        var pool = await conn;
        var sqlString =
            "SELECT * FROM Manager Where Username = @username and Password = @password";
        return await pool
            .request()
            .input("username", sql.VarChar, checkData.username)
            .input("password", sql.VarChar, checkData.password)
            .query(sqlString, function (err, data) {
                if (data.recordset.length > 0) {
                    result(null, data.recordset[0]);
                } else {
                    result(true, null);
                }
            });
    };
    this.checkAccUser = async function (checkData, result) {
        var pool = await conn;
        var sqlString =
            "SELECT * FROM Users Where Username = @username and Password = @password";
        return await pool
            .request()
            .input("username", sql.VarChar, checkData.username)
            .input("password", sql.VarChar, checkData.password)
            .query(sqlString, function (err, data) {
                if (data.recordset.length > 0) {
                    result(null, data.recordset[0]);
                } else {
                    result(true, null);
                }
            });
    };
};