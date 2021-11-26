const { conn, sql } = require("../../config/connectSQL");
module.exports = function () {
    this.getBookAll = async function (result) {
        var pool = await conn;
        var sqlString = "SELECT * FROM Books";
        return await pool.request().query(sqlString, function (err, data) {
            if (data.recordset.length > 0) {
                result(null, data.recordset);
            } else {
                result(true, null);
            }
        });
    };

    this.getBookDetail = async function (id, result) {
        var pool = await conn;
        var sqlString = "SELECT * FROM Books WHERE IdBook = @varId";
        return await pool
            .request()
            .input("varId", sql.Int, id)
            .query(sqlString, function (err, data) {
                console.log(err, data.recordset);
                if (data.recordset.length > 0) {
                    result(null, data.recordset[0]);
                } else {
                    result(true, null);
                }
            });
    };

    this.findBookByName = async function (Name, result) {
        var pool = await conn;
        var sqlString = "SELECT * FROM Books WHERE Name = @name";
        return await pool
            .request()
            .input("name", sql.NVarChar, Name)
            .query(sqlString, function (err, data) {
                if (data.recordset.length > 0) {
                    result(null, data.recordset[0]);
                } else {
                    result(true, null);
                }
            });
    };

    this.addBook = async function (newData, result) {
        var pool = await conn;
        var sqlString =
            "INSERT INTO Books (Name, TypeBook, Review, Quantity, ImgBook, LikeBook) VALUES (@name, @typeBook, @review, @quantity, @imgBook, @likeBook)";
        return await pool
            .request()
            .input("name", sql.NVarChar, newData.Name)
            .input("typeBook", sql.NVarChar, newData.TypeBook)
            .input("review", sql.NVarChar, newData.Review)
            .input("quantity", sql.Int, newData.Quantity)
            .input("imgBook", sql.VarChar, newData.ImgBook)
            .input("likeBook", sql.Int, 100)
            .query(sqlString, function (err, data) {
                if (err) {
                    result(true, null);
                } else {
                    result(null, newData);
                }
            });
        // res.body = newData
    };

    this.addWrite = async function (newData, result) {
        var pool = await conn;
        var sqlString =
            "INSERT INTO Write (IdAuthor, IdBook) VALUES (@idAuthor, @idBook)";
        return await pool
            .request()
            .input("idAuthor", sql.Int, newData.IdAuthor)
            .input("idBook", sql.Int, newData.IdAuthor)
            .query(sqlString, function (err, data) {
                if (err) {
                    result(true, null);
                } else {
                    result(null, newData);
                }
            });
    };

    this.updateBook = async function (newData, result) {
        var pool = await conn;
        var sqlString =
            "UPDATE Books SET Name = @name, TypeBook = @typeBook, Review = @review, Quantity = @quantity, ImgBook = @imgBook, LikeBook = @likeBook WHERE IdBook = @varId";
        return await pool
            .request()
            .input("name", sql.NVarChar, newData.Name)
            .input("typeBook", sql.NVarChar, newData.TypeBook)
            .input("review", sql.NVarChar, newData.Review)
            .input("quantity", sql.Int, newData.Quantity)
            .input("imgBook", sql.VarChar, newData.ImgBook)
            .input("likeBook", sql.Int, newData.LikeBook)
            .input("varId", sql.Int, newData.IdBook)
            .query(sqlString, function (err, data) {
                if (err) {
                    result(true, null);
                } else {
                    result(null, newData);
                }
            });
    };

    // this.deleteBook = async function (id, result) {
    //     var pool = await conn;
    //     var sqlString = "DELETE FROM Books WHERE IdBook = @varId";
    //     return await pool
    //         .request()
    //         .input("varId", sql.Int, id)
    //         .query(sqlString, function (err, data) {
    //             console.log(err, data.recordset);
    //             if (err) {
    //                 result(true, null);
    //             } else {
    //                 result(null, "Xóa thành công!");
    //             }
    //         });
    // };
};
