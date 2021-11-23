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

    // POST account user
    this.addAccUser = async function (newData, result) {
        var pool = await conn;
        var sqlString =
            "INSERT INTO Authors(Username, Password, Name, Email, Address) VALUES (@username, @password, @name, @email, @address)";
        return await pool
            .request()
            .input("username", sql.VarChar, newData.username)
            .input("password", sql.VarChar, newData.password)
            .input("name", sql.VarChar, newData.fullname)
            .input("email", sql.VarChar, newData.email)
            .input("address", sql.VarChar, newData.address)
            .query(sqlString, function (err, data) {
                if (err) {
                    result(true, null);
                } else {
                    result(null, newData);
                }
            });
    };
};
