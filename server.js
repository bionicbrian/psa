"use strict";

var express  = require("express");
var http     = require("http");
var path     = require("path");
var mongoose = require("mongoose");
var router   = require("./routes").middleware;

var app = express();
var publicDir = "public";

if (app.get("env") === "development") {
    mongoose.connect("mongodb://localhost/phonestacks_dev");
} else if (app.get("env") === "production") {
    // publicDir = "build";
    mongoose.connect(process.env.MONGOHQ_URL);
}

app.configure(function () {
    app.set("port", process.env.PORT || 3000);
    app.set("views", __dirname + "/public");
    app.use(express.favicon());
    app.use(express.logger("dev"));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser("finn teo moore"));
    app.use(express.session());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, publicDir)));
});

app.configure("development", function () {
    app.use(express.errorHandler());
});

app.use(router);

http.createServer(app).listen(app.get("port"), function () {
    console.log("Express server listening on port " + app.get("port"));
});
