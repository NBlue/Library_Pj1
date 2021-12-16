const adminBooksRoute = require("./adminBooksRoute");
const adminAuthorsRoute = require("./adminAuthorsRoute");
const adminUsersRoute = require("./adminUsersRouter");
const userBooksRouter = require("./userBooksRouter");
const userAuthorsRouter = require("./userAuthorsRouter");
const siteRoute = require("./siteRoute");
const UserController = require("../app/controllers/userOtherControler");

function route(app) {
    // ADMIN
    app.use("/admin/books", adminBooksRoute);
    app.use("/admin/authors", adminAuthorsRoute);
    app.use("/admin/users", adminUsersRoute);

    // USER
    app.get("/home", (req, res) => {
        res.render("user/user_home");
    });
    app.use("/books", userBooksRouter);
    app.use("/authors", userAuthorsRouter);
    app.get("/cart", (req, res) => {
        res.render("user/user_cart_books");
    });
    app.get("/acc/:id", UserController.getInfo);

    // OTHER
    app.use("", siteRoute);
}

module.exports = route;
