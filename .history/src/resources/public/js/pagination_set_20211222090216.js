var AdminBook = document.querySelectorAll(".admin-books .book__item");
if (AdminBook.length !== 0) {
    var bookItemShow = [];
    for (var element of AdminBook) {
        bookItemShow.push(`<div class="book__item">${element.innerHTML}</div>`);
    }
    $("#pagination").pagination({
        dataSource: bookItemShow,
        pageSize: 6,
        pageRange: 1,
        callback: function (data, pagination) {
            var html = data;
            $(".book__list").html(html);
        },
    });
}

var AdminAuthor = document.querySelectorAll(".admin-authors .author__item");
if (AdminAuthor.length !== 0) {
    var authorItemShow = [];
    for (var element of AdminAuthor) {
        authorItemShow.push(
            `<div class="author__item">${element.innerHTML}</div>`
        );
    }
    $("#pagination").pagination({
        dataSource: authorItemShow,
        pageSize: 6,
        pageRange: 1,
        callback: function (data, pagination) {
            var html = data;
            $(".author__list").html(html);
        },
    });
}

var AdminUser = document.querySelectorAll(".admin-users .user__item");
if (AdminUser.length !== 0) {
    var userItemShow = [];
    for (var element of AdminUser) {
        userItemShow.push(`<div class="user__item">${element.innerHTML}</div>`);
    }
    $("#pagination").pagination({
        dataSource: userItemShow,
        pageSize: 10,
        pageRange: 1,
        callback: function (data, pagination) {
            var html = data;
            $(".user__list").html(html);
        },
    });
}
