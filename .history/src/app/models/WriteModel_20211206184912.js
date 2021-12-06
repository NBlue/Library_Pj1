const { conn, sql } = require("../../config/connectSQL");
module.exports = function () {
    this.findByIdBook = async function (id, result) {
        var pool = await conn;
        var sqlString = "SELECT * FROM Write WHERE IdBook = @varId";
        return await pool
            .request()
            .input("varId", sql.Int, id)
            .query(sqlString, function (err, data) {
                if (data.recordset.length > 0) {
                    result(null, data.recordset);
                } else {
                    result(true, null);
                }
            });
    };
    this.addWrite = async function (newData, result) {
        var pool = await conn;
        var sqlString =
            "INSERT INTO Write (IdAuthor, IdBook) VALUES (@idAuthor, @idBook)";
        return await pool
            .request()
            .input("idAuthor", sql.Int, newData.IdAuthor)
            .input("idBook", sql.Int, newData.IdBook)
            .query(sqlString, function (err, data) {
                if (err) {
                    result(true, null);
                } else {
                    result(null, newData);
                }
            });
    };

    // this.updateWrite = async function (newData, result) {
    //     var pool = await conn;
    //     var sqlString =
    //         "UPDATE Write SET IdAuthor = @idAuthor WHERE IdBook = @idBook";
    //     return await pool
    //         .request()
    //         .input("idAuthor", sql.Int, newData.IdAuthor)
    //         .input("idBook", sql.Int, newData.IdBook)
    //         .query(sqlString, function (err, data) {
    //             if (err) {
    //                 result(true, null);
    //             } else {
    //                 result(null, newData);
    //             }
    //         });
    // };

    this.deleteWrite = async function (id) {
        var pool = await conn;
        var sqlString = "DELETE FROM Write WHERE IdBook = @idBook";
        return await pool
            .request()
            .input("idBook", sql.Int, id)
            .query(sqlString, function (err, data) {
                if (err) console.log("Error Delete!");
                else console.log("Delete successfull!");
            });
    };
};
