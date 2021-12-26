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
                if (data.recordset.length > 0) {
                    result(null, data.recordset[0]);
                } else {
                    result(true, null);
                }
            });
    };

    this.getAccUserById = async function (id, result) {
        var pool = await conn;
        var sqlString = "SELECT * FROM Users WHERE IdUser = @IdUser";
        return await pool
            .request()
            .input("IdUser", sql.Int, id)
            .query(sqlString, function (err, data) {
                if (data.recordset.length > 0) {
                    result(null, data.recordset[0]);
                } else {
                    result(true, null);
                }
            });
    };

    // Dùng để check khi đăng kí
    this.checkUserByUsername = async function (username) {
        try {
            let pool = await conn;
            let data = await pool
                .request()
                .input("username", sql.VarChar, username)
                .query("SELECT * FROM Users WHERE Username = @username");
            return data.recordset;
        } catch (err) {
            console.log(err);
        }
    };

    // POST accout user
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

    // Update accout user
    this.updateInforUser = async function (newData, result) {
        var pool = await conn;
        var sqlString =
            "UPDATE Users SET Name = @name, Email = @email, Address = @address WHERE IdUser = @idUser";
        return await pool
            .request()
            .input("name", sql.NVarChar, newData.Name)
            .input("email", sql.VarChar, newData.Email)
            .input("address", sql.NVarChar, newData.Address)
            .input("idUser", sql.Int, newData.IdUser)
            .query(sqlString, function (err, data) {
                if (err) {
                    result(true, null);
                } else {
                    result(null, newData);
                }
            });
    };

    // Update password
    this.updatePass = async function (newData, result) {
        var pool = await conn;
        var sqlString =
            "UPDATE Users SET Password = @password WHERE IdUser = @idUser";
        return await pool
            .request()
            .input("password", sql.VarChar, newData.password_new)
            .input("idUser", sql.Int, newData.IdUser)
            .query(sqlString, function (err, data) {
                if (err) {
                    result(true, null);
                } else {
                    result(null, newData);
                }
            });
    };

    // Borrow book
    this.borrowNewBook = async function (newData, result) {
        var pool = await conn;
        var sqlString =
            "INSERT INTO Borrow(IdUser, IdBook, BorrowDate, ReturnDatePlan) VALUES (@IdUser, @IdBook, @BorrowDate, @ReturnDatePlan)";
        return await pool
            .request()
            .input("IdUser", sql.Int, newData.IdUser)
            .input("IdBook", sql.Int, newData.IdBook)
            .input("BorrowDate", sql.Date, newData.BorrowDate)
            .input("ReturnDatePlan", sql.Date, newData.ReturnDate)
            .query(sqlString, function (err, data) {
                if (err) {
                    result(err, null);
                } else {
                    result(null, newData);
                }
            });
    };

    // Get book borrowing
    this.getBookBorrowing = async function (IdUser) {
        try {
            let pool = await conn;
            let data = await pool
                .request()
                .input("IdUser", sql.Int, IdUser)
                .query(
                    "SELECT Books.IdBook, Books.Name, Books.ImgBook, Users.IdUser, Borrow.BorrowDate, Borrow.ReturnDatePlan FROM Books, Borrow, Users WHERE Books.IdBook = Borrow.IdBook AND Users.IdUser = Borrow.IdUser AND ReturnDateActual IS NULL AND Users.IdUser = @IdUser"
                );
            return data.recordset;
        } catch (err) {
            console.log(err);
        }
    };

    // Get book borrowed
    this.getBookBorrowed = async function (IdUser) {
        try {
            let pool = await conn;
            let data = await pool
                .request()
                .input("IdUser", sql.Int, IdUser)
                .query(
                    "SELECT Books.IdBook, Books.Name, Books.ImgBook, Users.IdUser, Borrow.BorrowDate, Borrow.ReturnDatePlan FROM Books, Borrow, Users WHERE Books.IdBook = Borrow.IdBook AND Users.IdUser = Borrow.IdUser AND ReturnDateActual IS NOT NULL AND Users.IdUser = @IdUser"
                );
            return data.recordset;
        } catch (err) {
            console.log(err);
        }
    };

    this.returnBook = async function (IdBook, dateNow) {
        try {
            let pool = await conn;
            let data = await pool
                .request()
                .input("IdBook", sql.Int, IdBook)
                .input("ReturnDateActual", sql.VarChar, dateNow)
                .query(
                    "UPDATE Borrow SET ReturnDateActual = @ReturnDateActual WHERE IdBook = @IdBook AND ReturnDateActual IS NULL"
                );
            return data.recordset;
        } catch (err) {
            console.log(err);
        }
    };
};
