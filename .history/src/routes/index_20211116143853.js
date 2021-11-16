function route(app) {
    // LOGIN-REGISTER
app.get("", (req, res) => {
    res.render("register_login");
});

// ADMIN
// app.get("/admin/books", (req, res) => {
//     res.render("admin_books");
// });
app.get("/admin/users", (req, res) => {
    res.render("admin_users");
});

// USER
app.get("/user/home", (req, res) => {
    res.render("user_home");
});
app.get("/user/books", (req, res) => {
    res.render("user_books");
});
app.get("/user/authors", (req, res) => {
    res.render("user_authors");
});
app.get("/user/cart", (req, res) => {
    res.render("user_cart_books");
});
}

module.exports route