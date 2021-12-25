$("#pagination").pagination({
    // dataSource: [
    //     1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    //     21, 22,
    // ],

    dataSource: "/admin/books",
    locator: "items",
    totalNumberLocator: function (response) {
        // you can return totalNumber by analyzing response content
        return Math.floor(Math.random() * (1000 - 100)) + 100;
    },
    pageSize: 2,
    pageRange: 1,
    // callback: function (data, pagination) {
    //     // template method of yourself
    //     var html = `<p>Xin chao</p>` + data;
    //     $(".book__list").html(html);
    // },
    afterPageOnClick: function (event, pageNumber) {
        loadPage(pageNumber);
    },
});

function loadPage() {
    $.ajax({
        url: "/admin/books",
    })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => console.error(err));
}

// $("#pagination").pagination({
//     dataSource: [
//         1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
//         21, 22, 23, 24, 25, 26, 195,
//     ],
//     pageSize: 2,
//     pageRange: 1,
//     callback: function (data, pagination) {
//         var html = Handlebars.compile($("#template-demo").html(), {
//             data: data,
//         });
//         $(".book__list").html(html);
//     },
// });
