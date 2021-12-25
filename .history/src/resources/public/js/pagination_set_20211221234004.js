var AdminBook = document.querySelectorAll(".admin-books .book__item");
if (AdminBook != null) {
    var bookItemShow = [];
    for (var element of AdminBook) {
        bookItemShow.push(`<div class="book__item">${element.innerHTML}</div>`);
    }
    $("#pagination").pagination({
        dataSource: bookItemShow,
        pageSize: 4,
        pageRange: 1,
        callback: function (data, pagination) {
            var html = data;
            $(".book__list").html(html);
        },
    });
}

var AdminAuthor = document.querySelectorAll(".admin-authors .author__item");
