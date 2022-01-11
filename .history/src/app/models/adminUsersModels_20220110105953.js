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

    this.getUserLocking = async function () {
        try {
            let pool = await conn;
            let data = await pool
                .request()
                .query("SELECT * FROM Users WHERE LockStatus IS NOT NULL");
            return data.recordset;
        } catch (err) {
            console.log(err);
        }
    };

    this.getUserWaring = async function () {
        try {
            let pool = await conn;
            let data = await pool
                .request()
                .query(
                    "SELECT * FROM Users WHERE LockStatus IS NULL AND Score <= 10"
                );
            return data.recordset;
        } catch (err) {
            console.log(err);
        }
    };

    this.getInfoById = async function (IdUser) {
        try {
            let pool = await conn;
            let data = await pool
                .request()
                .input("IdUser", sql.Int, IdUser)
                .query("SELECT * FROM Users WHERE IdUser = @IdUser");
            return data.recordset;
        } catch (err) {
            console.log(err);
        }
    };

    this.updateLockStatus = async function (IdUser) {
        try {
            let pool = await conn;
            let data = await pool
                .request()
                .input("IdUser", sql.Int, IdUser)
                .query(
                    "UPDATE Users SET Score = 100, LockStatus = NULL WHERE IdUser = @IdUser"
                );
            return data.recordset;
        } catch (err) {
            console.log(err);
        }
    };
};
