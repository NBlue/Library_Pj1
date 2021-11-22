const adminBooksRoute = require("./adminBooksRoute");
const adminAuthorsRoute = require("./adminAuthorsRoute");
const siteRoute = require("./siteRoute");

function route(app) {
    // ADMIN
    app.use("/admin/books", adminBooksRoute);
    app.use("/admin/authors", adminAuthorsRoute);
    app.get("/admin/users", (req, res) => {
        res.render("admin/admin_users");
    });

    // USER
    app.get("/user/home", (req, res) => {
        res.render("user/user_home");
    });
    app.get("/user/books", (req, res) => {
        res.render("user/user_books");
    });
    app.get("/user/authors", (req, res) => {
        res.render("user/user_authors");
    });
    app.get("/user/cart", (req, res) => {
        res.render("user/user_cart_books");
    });

    // OTHER
    app.use("", siteRoute);
}

module.exports = route;
