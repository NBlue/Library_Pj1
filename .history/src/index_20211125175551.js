const path = require("path");
const express = require("express");
const morgan = require("morgan");
var methodOverride = require("method-override");
const handlebars = require("express-handlebars");
const fileUpload = require("express-fileupload");
const app = express();
const port = 3000;

// CONNECT SQL
const { conn, sql } = require("./config/connectSQL");
if (conn != null) console.log("Connect successful!");

// Static file
app.use(express.static(path.join(__dirname, "resources/public")));

// Body parth có luôn trên express thế hệ mới nên ko cần cài
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride("_method"));

// HTTP logger
app.use(morgan("combined"));
// user handlebars
const hbs = handlebars.create({
    helpers: {
        sayHello: function () {
            alert("Hello World");
        },
        getStringifiedJson: function (value) {
            return JSON.stringify(value);
        },
        sum: (a, b) => a + b, //tao function cộng số thứ tự trong view
    },
    // defaultLayout: "main",
    //link tới partials
    partialsDir: [path.join(__dirname, "resources/views/partials")],
    extname: ".hbs",
});
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources/views"));

// default option dùng để upload file
app.use(fileUpload());

// ROUTES INIT
const route = require("./routes/index");
route(app);

app.listen(port, () => {
    console.log(`Website đang chạy tại: http://localhost:${port}`);
});
