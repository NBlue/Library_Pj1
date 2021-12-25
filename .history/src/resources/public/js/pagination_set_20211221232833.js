var bookItem = document.querySelectorAll(".admin-books .book__item");
var bookItemShow = [];
for (var element of bookItem) {
    // bookItemShow.push(element.innerHTML);
    bookItemShow.push(`<div class="book__item">${element.innerHTML}</div>`);
}
console.log(bookItemShow);
$("#pagination").pagination({
    dataSource: bookItemShow,
    pageSize: 2,
    pageRange: 1,
    callback: function (data, pagination) {
        // template method of yourself
        console.log(data);
        var html = data;
        $(".book__list").html(html);
    },
});
