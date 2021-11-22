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

    this.findById = async function (id, result) {
        var pool = await conn;
        var sqlString = "SELECT * FROM Authors WHERE IdAuthor = @varId";
        return await pool
            .request()
            .input("varId", sql.Int, id)
            .query(sqlString, function (err, data) {
                if (data.recordset.length > 0) {
                    result(null, data.recordset[0]);
                } else {
                    result(true, null);
                }
            });
    };

    this.addAuthor = async function (newData, result) {
        var pool = await conn;
        var sqlString =
            "INSERT INTO Authors(Name, ImgAuthor) VALUES (@name, @imgAuthor)";
        return await pool
            .request()
            .input("name", sql.NVarChar, newData.Name)
            .input("imgAuthor", sql.VarChar, newData.ImgAuthor)
            .query(sqlString, function (err, data) {
                if (err) {
                    result(true, null);
                } else {
                    result(null, newData);
                }
            });
    };

    this.updateAuthor = async function (newData, result) {
        var pool = await conn;
        var sqlString =
            "UPDATE Authors SET Name = @name, ImgAuthor = @imgAuthor  IdAuthor = @varId";
        return await pool
            .request()
            .input("name", sql.NVarChar, newData.Name)
            .input("imgBook", sql.VarChar, newData.ImgAuthor)
            .input("varId", sql.Int, newData.IdAuthor)
            .query(sqlString, function (err, data) {
                if (err) {
                    result(true, null);
                } else {
                    result(null, newData);
                }
            });
    };
};
