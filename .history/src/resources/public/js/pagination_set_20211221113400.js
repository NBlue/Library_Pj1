$("#pagination").pagination({
    dataSource: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22,
    ],
    pageSize: 2,
    callback: function (data, pagination) {
        // template method of yourself
        var html = `<p>Xin chao</p>` + data;
        $(".book__list").html(html);
    },
});
