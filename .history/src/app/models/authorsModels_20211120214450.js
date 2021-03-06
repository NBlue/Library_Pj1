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
};
