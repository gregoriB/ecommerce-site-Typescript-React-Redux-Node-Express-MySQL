import { Response, NextFunction } from "express";
import { MysqlError } from "mysql";

const mysql = require("mysql");
const express = require("express");
const app = express();
const path = require("path");

require("dotenv").config();

const nodeEnv = app.get("env");
const isDevelopment = nodeEnv === "development";

app.use(
    express.static(
        path.join(__dirname, `client/${isDevelopment ? "public" : "build"}`)
    )
);

app.use(express.json({ type: "applications/json" }));

app.use((_: null, res: Response, next: NextFunction) => {
    res.append("Access-Control-Allow-Origin", "*");
    res.append("Access-Control-Allow-Headers", "POST");
    res.append("Access-Control-Allow-Headers", "Content-Type");
    next();
});

let products: any;

app.post("/", (_: null, res: Response) => {
    fetchProductData();
    res.json(products);
});

function fetchProductData() {
    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    });
    connection.connect();
    connection.query(
        "SELECT * FROM items",
        (error: MysqlError, results: any) => {
            if (error) throw error;
            products = results;
        }
    );
    connection.end();
}

const listener = app.listen(34567, () => {
    console.info("\x1b[33m", `${nodeEnv} server`);
    console.info(
        "\x1b[36m", //cyan font color
        "SERVER LISTENING ON PORT:",
        "\x1b[33m", //yellow font color
        listener.address().port
    );
});
