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
                if (data.recordset.length > 0) {
                    result(null, data.recordset[0]);
                } else {
                    result(true, null);
                }
            });
    };

    this.findBooksById = async function (id, result) {
        var pool = await conn;
        var sqlString =
            "SELECT * FROM Books, Authors, Write WHERE Books.IdBook = Write.IdBook AND Authors.IdAuthor = Write.IdAuthor AND Authors.IdAuthor = @IdAuthor";
        return await pool
            .request()
            .input("IdAuthor", sql.Int, id)
            .query(sqlString, function (err, data) {
                if (data.recordset.length > 0) {
                    result(null, data.recordset);
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

    this.findBookByTypeBook = async function (TypeBook, result) {
        var pool = await conn;
        var sqlString =
            "SELECT * FROM Books WHERE TypeBook = @TypeBook AND Quantity > 0";
        return await pool
            .request()
            .input("TypeBook", sql.NVarChar, TypeBook)
            .query(sqlString, function (err, data) {
                if (data.recordset.length > 0) {
                    result(null, data.recordset);
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

    this.updateBook = async function (newData, result) {
        var pool = await conn;
        var sqlString =
            "UPDATE Books SET Name = @name, TypeBook = @typeBook, Review = @review, Quantity = @quantity, ImgBook = @imgBook WHERE IdBook = @varId";
        return await pool
            .request()
            .input("name", sql.NVarChar, newData.Name)
            .input("typeBook", sql.NVarChar, newData.TypeBook)
            .input("review", sql.NVarChar, newData.Review)
            .input("quantity", sql.Int, newData.Quantity)
            .input("imgBook", sql.VarChar, newData.ImgBook)
            .input("varId", sql.Int, newData.IdBook)
            .query(sqlString, function (err, data) {
                if (err) {
                    result(true, null);
                } else {
                    result(null, newData);
                }
            });
    };

    this.deleteBook = async function (id) {
        var pool = await conn;
        var sqlString = "DELETE FROM Books WHERE IdBook = @IdBook";
        return await pool
            .request()
            .input("IdBook", sql.Int, id)
            .query(sqlString, function (err, data) {
                if (err) {
                    console.log("Error Delete!");
                } else {
                    console.log("Delete Successful!");
                }
            });
    };

    // Lấy ra top 7 quyển sách có số lượng Nhiều
    this.getTopPopularByQuantity = async function (result) {
        var pool = await conn;
        var sqlString = "SELECT TOP(6) * FROM Books ORDER BY Quantity DESC";
        return await pool.request().query(sqlString, function (err, data) {
            if (data.recordset.length > 0) {
                result(null, data.recordset);
            } else {
                result(true, null);
            }
        });
    };

    this.findBookById = async function (IdBook) {
        try {
            let pool = await conn;
            let data = await pool
                .request()
                .input("IdBook", sql.Int, IdBook)
                .query("SELECT * FROM Books WHERE IdBook = @IdBook");
            return data.recordset[0];
        } catch (err) {
            console.log(err);
        }
    };

    this.updateQuantity = async function (IdBook, newQuantity) {
        try {
            let pool = await conn;
            let data = await pool
                .request()
                .input("Quantity", sql.Int, newQuantity)
                .input("IdBook", sql.Int, IdBook)
                .query(
                    "UPDATE Books SET Quantity = @Quantity WHERE IdBook = @IdBook"
                );
            return data.recordset;
        } catch (err) {
            console.log(err);
        }
    };

    // Thống kê loại sách
    this.statisticTypebook = async function () {
        try {
            let pool = await conn;
            let data = await pool
                .request()
                .query(
                    'SELECT TypeBook, COUNT(IdBook) AS "Number" FROM Books GROUP BY TypeBook '
                );
            return data.recordset;
        } catch (err) {
            console.log(err);
        }
    };

    this.statisticBook = async function (type) {
        // type: DESC or ASC
        try {
            let pool = await conn;
            let data = await pool
                .request()
                .query(
                    "SELECT TOP(5) IdBook, Name, Quantity FROM Books ORDER BY Quantity " +
                        type
                );
            return data.recordset;
        } catch (err) {
            console.log(err);
        }
    };
};
