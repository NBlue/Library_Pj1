const path = require("path");
const express = require("express");
const morgan = require("morgan");
const handlebars = require("express-handlebars");
const app = express();
const port = 3000;

// HTTP logger
app.use(morgan("combined"));

// Template engine
// var hbs = handlebars.create();
// app.engine("hbs", hbs.engine);
// app.set("view engine", "hbs");
// app.set("views", path.join(__dirname, "resource/views"));
const hbs = handlebars.create({
    helpers: {
        sayHello: function () {
            alert("Hello World");
        },
        getStringifiedJson: function (value) {
            return JSON.stringify(value);
        },
    },
    defaultLayout: "main",
    partialsDir: ["views/partials/"],
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "resources/views"));

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/news", (req, res) => {
    res.render("new");
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});