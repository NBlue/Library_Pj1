const path = require("path");
const express = require("express");
const morgan = require("morgan");
const handlebars = require("express-handlebars");
const app = express();
const port = 3000;

// Static file
app.use(express.static(path.join(__dirname, "resources/public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// HTTP logger
app.use(morgan("combined"));

const hbs = handlebars.create({
    helpers: {
        sayHello: function () {
            alert("Hello World");
        },
        getStringifiedJson: function (value) {
            return JSON.stringify(value);
        },
    },
    // defaultLayout: "main",
    //link tới partials
    partialsDir: [path.join(__dirname, "resources/views/partials")],
    extname: ".hbs",
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources/views"));

// LOGIN-REGISTER
app.get("", (req, res) => {
    res.render("register_login");
});

// ADMIN
app.get("/admin/books", (req, res) => {
    res.render("admin_books");
});
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

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
