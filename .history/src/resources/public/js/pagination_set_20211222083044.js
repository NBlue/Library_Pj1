// var AdminBook = document.querySelectorAll(".admin-books .book__item");
// if (AdminBook != null) {
//     var bookItemShow = [];
//     for (var element of AdminBook) {
//         bookItemShow.push(`<div class="book__item">${element.innerHTML}</div>`);
//     }
//     $("#pagination").pagination({
//         dataSource: bookItemShow,
//         pageSize: 6,
//         pageRange: 1,
//         callback: function (data, pagination) {
//             var html = data;
//             $(".book__list").html(html);
//         },
//     });
// }

var AdminAuthor = document.querySelectorAll(".admin-authors .author__item");
console.log(AdminAuthor);
if (AdminAuthor != null) {
    var authorItemShow = [];
    for (var element of AdminAuthor) {
        authorItemShow.push(
            `<div class="author__item">${element.innerHTML}</div>`
        );
    }
    $(".pagination").pagination({
        dataSource: authorItemShow,
        pageSize: 2,
        pageRange: 1,
        callback: function (data, pagination) {
            var html = data;
            $(".author__list").html(html);
        },
    });
}
