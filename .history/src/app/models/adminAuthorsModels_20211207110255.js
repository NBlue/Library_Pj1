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

    this.findByIdBook = async function (id) {
        try {
            let pool = await conn;
            let data = await pool
                .request()
                .input("IdBook", sql.Int, id)
                .query(
                    "SELECT Authors.* FROM Books, Authors, Write WHERE Books.IdBook = Write.IdBook And Authors.IdAuthor = Write.IdAuthor And Books.IdBook = @IdBook"
                );
            return data.recordset;
        } catch (err) {
            console.log(err);
        }
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
            "UPDATE Authors SET Name = @name, ImgAuthor = @imgAuthor WHERE IdAuthor = @varId";
        return await pool
            .request()
            .input("name", sql.NVarChar, newData.Name)
            .input("imgAuthor", sql.VarChar, newData.ImgAuthor)
            .input("varId", sql.Int, newData.IdAuthor)
            .query(sqlString, function (err, data) {
                if (err) {
                    result(true, null);
                } else {
                    result(null, newData);
                }
            });
    };

    this.deleteAuthor = async function (id, result) {
        var pool = await conn;
        var sqlString = "DELETE FROM Authors WHERE IdAuthor = @varId";
        return await pool
            .request()
            .input("varId", sql.Int, id)
            .query(sqlString, function (err, data) {
                if (err) {
                    result(true, null);
                } else {
                    result(null, "Xóa thành công!");
                }
            });
    };
};
