const express = require("express");
const app = express();
const hbs = require("hbs");
const fs = require("fs")

// ミドルウェア
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");
hbs.registerHelper("getCurrentYear", () => {
    return new Date().getFullYear();
});
hbs.registerHelper("uppercase", text => {
    return text.toUpperCase();
})

app.use((req, res, next) => {
    let now = new Date();
    let log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile("server.log", log + "\n", err => {
        if (err){
            console.log(err);
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render("maintenance.hbs");
// })

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    res.render("home.hbs",{
        pageTitle: "Home Page",
        content: "当ページへようこそ！",
    });
});

app.get("/about", (req, res) => {
    res.render("about.hbs", {
        pageTitle: "About Page",
        content: "コンテンツです",
    });
});

app.listen(3030);