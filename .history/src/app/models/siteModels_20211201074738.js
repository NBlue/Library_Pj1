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

    this.getUserByUsername = async function (username, result) {
        var pool = await conn;
        var sqlString = "SELECT * FROM Users WHERE Username = @username";
        return await pool
            .request()
            .input("username", sql.VarChar, username)
            .query(sqlString, function (err, data) {
                console.log(err, data.recordset);
                if (data.recordset.length > 0) {
                    result(null, data.recordset[0]);
                } else {
                    result(true, null);
                }
            });
    };

    // POST account user
    this.addAccUser = async function (newData, result) {
        var pool = await conn;
        var sqlString =
            "INSERT INTO Users(Username, Password, Name, Email, Address, Score, LockNumber) VALUES (@username, @password, @name, @email, @address, @score, @lockNumber)";
        return await pool
            .request()
            .input("username", sql.VarChar, newData.username)
            .input("password", sql.VarChar, newData.password)
            .input("name", sql.NVarChar, newData.fullname)
            .input("email", sql.VarChar, newData.email)
            .input("address", sql.NVarChar, newData.address)
            .input("score", sql.VarChar, 100)
            .input("lockNumber", sql.VarChar, 0)
            .query(sqlString, function (err, data) {
                if (err) {
                    result(true, null);
                } else {
                    result(null, newData);
                }
            });
    };
};
