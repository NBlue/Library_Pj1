const path = require("path");
const express = require("express");
const morgan = require("morgan");
const handlebars = require("express-handlebars");
const app = express();
const port = 3000;

// Static file
// app.use(express.static(path.join(__dirname, "resources/public/img")));
app
    .use
    // express.static(path.join(__dirname, "resources/public/css/navbar.css"))
    ();
app.use(express.static(__dirname + "/public"));
// app.use("/static", express.static(path.join(__dirname, "resources/public")));
console.log("PATH: " + path.join(__dirname, "resources/public"));
// app.use("*/img", express.static("public/img"));
// app.use(express.static(__dirname + "/public"));

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

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/news", (req, res) => {
    res.render("news");
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
