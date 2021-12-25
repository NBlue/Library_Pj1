var bookItem = document.querySelectorAll(".admin-books .book__item");
var bookItemShow = [];
for (var element of bookItem) {
    bookItemShow.push(element.innerHTML);
}
console.log(bookItemShow);
$("#pagination").pagination({
    dataSource: bookItemShow,
    pageSize: 2,
    pageRange: 1,
    callback: function (data, pagination) {
        // template method of yourself
        var html = `<p>Xin chao</p>` + data;
        $(".book__list").html(html);
    },
});
