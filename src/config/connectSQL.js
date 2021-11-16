var sql = require("mssql/msnodesqlv8");

// Thông tin kết nối
var config = {
    server: "localhost",
    user: "sa",
    password: "01052001",
    database: "QLTV",
    driver: "msnodesqlv8",
};

const conn = new sql.ConnectionPool(config).connect().then((pool) => {
    return pool;
});

// Xuất modul
module.exports = {
    conn: conn,
    sql: sql,
};
