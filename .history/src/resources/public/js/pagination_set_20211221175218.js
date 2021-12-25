var bookItem = document.querySelectorAll(".admin-books .book__item");
var bookItemShow = [];
for (var element of bookItem) {
    bookItemShow.push(element.innerHTML);
}
console.log(bookItemShow);
$("#pagination").pagination({
    dataSource: bookItemShow,
    pageSize: 1,
    pageRange: 1,
    callback: function (data, pagination) {
        // template method of yourself
        console.log(data);
        var html = `<div class="book__item">${data}</div>`;
        $(".book__list").html(html);
    },
});
