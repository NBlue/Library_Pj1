const path = require("path");
const express = require("express");
const morgan = require("morgan");
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
    },
    // defaultLayout: "main",
    //link tới partials
    partialsDir: [path.join(__dirname, "resources/views/partials")],
    extname: ".hbs",
});
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources/views"));

// default option
app.use(fileUpload());

// ROUTES INIT
const route = require("./routes/index");
route(app);

app.listen(port, () => {
    console.log(`Cổng đang chạy tại: http://localhost:${port}`);
});
