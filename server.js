"use strict";
exports.__esModule = true;
// import express = require("express");
var express = require("express");
var mysql = require("mysql");
var path = require("path");
var app = express();
require("dotenv").config();
var nodeEnv = app.get("env");
var isDevelopment = nodeEnv === "development";
app.use(express.static(path.join(__dirname, "client/" + (isDevelopment ? "public" : "build"))));
app.use(express.json({ type: "applications/json" }));
app.use(function (req, res, next) {
    res.append("Access-Control-Allow-Origin", "*");
    res.append("Access-Control-Allow-Headers", "POST");
    res.append("Access-Control-Allow-Headers", "Content-Type");
    next();
});
var products;
app.post("/", function (req, res) {
    fetchProductData();
    res.json(products);
});
function fetchProductData() {
    var connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    });
    connection.connect();
    connection.query("SELECT * FROM items", function (error, results) {
        if (error)
            throw error;
        products = results;
    });
    connection.end();
}
var listener = app.listen(34567, function () {
    console.info("\x1b[33m", nodeEnv + " server");
    console.info("\x1b[36m", //cyan font color
    "SERVER LISTENING ON PORT:", "\x1b[33m", //yellow font color
    listener.address().port);
});
