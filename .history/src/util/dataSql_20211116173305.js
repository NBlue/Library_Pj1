// file này để fix bug của handerbars bản mới
module.exports = {
    multipDataSqlToObject: function (datas) {
        return datas.map((data) => data.toObject());
    },
    dataSqlToObject: function (data) {
        return data ? data.toObject() : data;
    },
};
