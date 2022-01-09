//pagination admin - book
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
// Lọc Sách
const onFilterBook = () => {
    let filterBox = document
        .querySelector("#form-filter input")
        .value.toUpperCase();
    let bookItemShow = [];
    for (let i = 0; i < AdminBook.length; i++) {
        let Name = AdminBook[i].querySelector(".book__item-name .name_text");
        let name = Name.textContent || Name.innerHTML;
        let Type = AdminBook[i].querySelector(".book__item-type .type_text");
        let type = Type.textContent || Type.innerHTML;
        if (
            name.toUpperCase().includes(filterBox) ||
            type.toUpperCase().includes(filterBox)
        ) {
            console.log(AdminBook[i]);
            AdminBook[i].style.display = "";
            bookItemShow.push(AdminBook[i]);
        } else {
            AdminBook[i].style.display = "none";
        }
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
};

// pagination admin - author
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
// Lọc tác giả
const onFilterAuthor = () => {
    let filterBox = document
        .querySelector("#form-filter input")
        .value.toUpperCase();
    let authorItemShow = [];
    for (let i = 0; i < AdminAuthor.length; i++) {
        let Name = AdminAuthor[i].querySelector(
            ".author__item-name .name_text"
        );
        let name = Name.textContent || Name.innerHTML;
        if (name.toUpperCase().includes(filterBox)) {
            AdminAuthor[i].style.display = "";
            authorItemShow.push(AdminAuthor[i]);
        } else {
            AdminAuthor[i].style.display = "none";
        }
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
};

// pagination admin - user
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
            $(".container-admin .user__list").html(html);
        },
    });
}

// pagination user - book
var UserBook = document.querySelectorAll(
    ".container-users > .book .book__item"
);
if (UserBook.length !== 0) {
    var bookItemShow = [];
    for (var element of UserBook) {
        bookItemShow.push(`
        <div class="col l-2-4">
            <div class="book__item">
                ${element.innerHTML}
            </div>
        </div>
        `);
    }
    $("#pagination").pagination({
        dataSource: bookItemShow,
        pageSize: 15,
        pageRange: 1,
        callback: function (data, pagination) {
            var html = data;
            $(".book__list .row").html(html);
        },
    });
}

// pagination user - book
var UserAuthor = document.querySelectorAll(
    ".container-users > .authors .author__item"
);
if (UserAuthor.length !== 0) {
    var authorItemShow = [];
    for (var element of UserAuthor) {
        authorItemShow.push(`
        <div class="col l-4">
            <div class="author__item">
                ${element.innerHTML}
            </div>
        </div>
        `);
    }
    $("#pagination").pagination({
        dataSource: authorItemShow,
        pageSize: 9,
        pageRange: 1,
        callback: function (data, pagination) {
            var html = data;
            $(".authors .row").html(html);
        },
    });
}
